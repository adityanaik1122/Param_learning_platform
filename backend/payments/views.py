from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .models import Payment, Subscription
from datetime import datetime, timedelta
import razorpay
import hmac
import hashlib
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Razorpay
razorpay_client = razorpay.Client(auth=(
    os.getenv('RAZORPAY_KEY_ID', ''),
    os.getenv('RAZORPAY_KEY_SECRET', '')
))

# Pricing configuration
PRICING_PLANS = {
    'monthly': {
        'name': 'Monthly Premium',
        'price': 199,  # ₹199
        'currency': 'INR',
        'interval': 'month',
        'features': [
            'Unlimited code execution',
            'Access to all ML courses',
            'Priority support',
            'Advanced AI features',
            'Certificate of completion'
        ]
    },
    'yearly': {
        'name': 'Yearly Premium',
        'price': 1999,  # ₹1,999 (save ₹389)
        'currency': 'INR',
        'interval': 'year',
        'features': [
            'All Monthly features',
            'Save ₹389 per year',
            '1-on-1 mentorship session',
            'Exclusive community access',
            'Early access to new features'
        ]
    }
}


class PaymentViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def pricing(self, request):
        """Get pricing plans"""
        return Response({
            'plans': PRICING_PLANS,
            'currency': 'INR',
            'currency_symbol': '₹'
        })
    
    @action(detail=False, methods=['get'])
    def subscription_status(self, request):
        """Get current user's subscription status"""
        try:
            subscription = Subscription.objects.get(user=request.user)
            return Response({
                'active': subscription.is_premium,
                'plan': subscription.plan,
                'status': subscription.status,
                'expires_at': subscription.expires_at.isoformat() if subscription.expires_at else None,
                'started_at': subscription.started_at.isoformat(),
                'is_premium': subscription.is_premium
            })
        except Subscription.DoesNotExist:
            # Create free subscription if doesn't exist
            subscription = Subscription.objects.create(user=request.user, plan='free')
            return Response({
                'active': False,
                'plan': 'free',
                'status': 'active',
                'expires_at': None,
                'is_premium': False
            })
    
    @action(detail=False, methods=['post'])
    def create_order(self, request):
        """Create Razorpay order for subscription"""
        plan = request.data.get('plan', 'monthly')
        
        if plan not in PRICING_PLANS:
            return Response(
                {'error': 'Invalid plan selected'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if user already has an active premium subscription
        try:
            subscription = Subscription.objects.get(user=request.user)
            if subscription.is_premium and subscription.status == 'active':
                return Response(
                    {
                        'error': 'You already have an active premium subscription',
                        'current_plan': subscription.plan,
                        'expires_at': subscription.expires_at.isoformat() if subscription.expires_at else None
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Subscription.DoesNotExist:
            pass
        
        # Check for pending payments to prevent double charging
        pending_payment = Payment.objects.filter(
            user=request.user,
            status='pending',
            created_at__gte=datetime.now() - timedelta(minutes=15)  # Within last 15 minutes
        ).first()
        
        if pending_payment:
            return Response(
                {
                    'error': 'You have a pending payment. Please complete or wait for it to expire.',
                    'pending_order_id': pending_payment.razorpay_order_id
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not os.getenv('RAZORPAY_KEY_ID'):
            return Response(
                {'error': 'Payment gateway not configured'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        try:
            plan_config = PRICING_PLANS[plan]
            
            # Create Razorpay order
            order_data = {
                'amount': plan_config['price'] * 100,  # Amount in paise
                'currency': plan_config['currency'],
                'receipt': f"order_{request.user.id}_{datetime.now().timestamp()}",
                'notes': {
                    'user_id': request.user.id,
                    'plan': plan,
                    'email': request.user.email
                }
            }
            
            order = razorpay_client.order.create(data=order_data)
            
            # Create pending payment record to track this order
            Payment.objects.create(
                user=request.user,
                amount=plan_config['price'],
                currency=plan_config['currency'],
                status='pending',
                transaction_id=f"pending_{order['id']}",
                payment_gateway='razorpay',
                razorpay_order_id=order['id'],
                description=f"Pending: {plan_config['name']}"
            )
            
            return Response({
                'order_id': order['id'],
                'amount': plan_config['price'],
                'currency': plan_config['currency'],
                'key_id': os.getenv('RAZORPAY_KEY_ID'),
                'plan': plan,
                'user_name': f"{request.user.first_name} {request.user.last_name}",
                'user_email': request.user.email,
                'user_contact': getattr(request.user, 'phone', '')
            })
            
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['post'])
    def verify_payment(self, request):
        """Verify Razorpay payment signature"""
        try:
            razorpay_order_id = request.data.get('razorpay_order_id')
            razorpay_payment_id = request.data.get('razorpay_payment_id')
            razorpay_signature = request.data.get('razorpay_signature')
            plan = request.data.get('plan')
            
            # Check if this payment was already processed
            existing_payment = Payment.objects.filter(
                razorpay_payment_id=razorpay_payment_id,
                status='completed'
            ).first()
            
            if existing_payment:
                return Response(
                    {
                        'error': 'This payment has already been processed',
                        'message': 'Your subscription is already active'
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Verify signature
            generated_signature = hmac.new(
                os.getenv('RAZORPAY_KEY_SECRET', '').encode(),
                f"{razorpay_order_id}|{razorpay_payment_id}".encode(),
                hashlib.sha256
            ).hexdigest()
            
            if generated_signature != razorpay_signature:
                # Mark payment as failed
                Payment.objects.filter(razorpay_order_id=razorpay_order_id).update(status='failed')
                return Response(
                    {'error': 'Invalid payment signature'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Payment verified - update subscription
            subscription, created = Subscription.objects.get_or_create(user=request.user)
            subscription.plan = plan
            subscription.status = 'active'
            subscription.razorpay_subscription_id = razorpay_payment_id
            
            # Set expiration date
            plan_config = PRICING_PLANS.get(plan, {})
            if plan == 'monthly':
                subscription.expires_at = datetime.now() + timedelta(days=30)
            elif plan == 'yearly':
                subscription.expires_at = datetime.now() + timedelta(days=365)
            
            subscription.save()
            
            # Update pending payment record or create new one
            payment = Payment.objects.filter(razorpay_order_id=razorpay_order_id).first()
            if payment:
                payment.status = 'completed'
                payment.razorpay_payment_id = razorpay_payment_id
                payment.transaction_id = razorpay_payment_id
                payment.subscription = subscription
                payment.save()
            else:
                # Create payment record if not exists
                Payment.objects.create(
                    user=request.user,
                    subscription=subscription,
                    amount=plan_config.get('price', 0),
                    currency=plan_config.get('currency', 'INR'),
                    status='completed',
                    transaction_id=razorpay_payment_id,
                    payment_gateway='razorpay',
                    razorpay_payment_id=razorpay_payment_id,
                    razorpay_order_id=razorpay_order_id,
                    description=f"Subscription: {plan_config.get('name', plan)}"
                )
            
            return Response({
                'message': 'Payment verified successfully',
                'subscription': {
                    'plan': subscription.plan,
                    'status': subscription.status,
                    'expires_at': subscription.expires_at.isoformat() if subscription.expires_at else None
                }
            })
            
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['post'])
    def cancel_subscription(self, request):
        """Cancel user's subscription"""
        try:
            subscription = Subscription.objects.get(user=request.user)
            
            subscription.status = 'canceled'
            subscription.plan = 'free'
            subscription.save()
            
            return Response({
                'message': 'Subscription canceled successfully',
                'expires_at': subscription.expires_at.isoformat() if subscription.expires_at else None
            })
            
        except Subscription.DoesNotExist:
            return Response(
                {'error': 'No active subscription found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=False, methods=['get'])
    def payment_history(self, request):
        """Get user's payment history"""
        payments = Payment.objects.filter(user=request.user)
        
        payment_data = [{
            'id': payment.id,
            'amount': float(payment.amount),
            'currency': payment.currency,
            'status': payment.status,
            'payment_method': payment.payment_method,
            'transaction_id': payment.transaction_id,
            'description': payment.description,
            'created_at': payment.created_at.isoformat(),
            'receipt_url': payment.receipt_url
        } for payment in payments]
        
        return Response({
            'payments': payment_data,
            'total_payments': len(payment_data)
        })


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def razorpay_webhook(request):
    """Handle Razorpay webhooks"""
    try:
        webhook_secret = os.getenv('RAZORPAY_WEBHOOK_SECRET', '')
        webhook_signature = request.META.get('HTTP_X_RAZORPAY_SIGNATURE', '')
        
        if webhook_secret:
            # Verify webhook signature
            razorpay_client.utility.verify_webhook_signature(
                request.body.decode('utf-8'),
                webhook_signature,
                webhook_secret
            )
        
        payload = request.data
        event = payload.get('event')
        
        if event == 'payment.captured':
            handle_payment_captured(payload['payload']['payment']['entity'])
        elif event == 'payment.failed':
            handle_payment_failed(payload['payload']['payment']['entity'])
        elif event == 'subscription.cancelled':
            handle_subscription_cancelled(payload['payload']['subscription']['entity'])
        
        return HttpResponse(status=200)
        
    except Exception as e:
        print(f"Webhook error: {e}")
        return HttpResponse(status=400)


def handle_payment_captured(payment_data):
    """Handle successful payment capture"""
    try:
        order_id = payment_data.get('order_id')
        payment_id = payment_data.get('id')
        amount = payment_data.get('amount', 0) / 100  # Convert from paise
        
        # Find payment record and update
        payment = Payment.objects.filter(razorpay_order_id=order_id).first()
        if payment:
            payment.status = 'completed'
            payment.razorpay_payment_id = payment_id
            payment.save()
            
    except Exception as e:
        print(f"Error handling payment capture: {e}")


def handle_payment_failed(payment_data):
    """Handle failed payment"""
    try:
        order_id = payment_data.get('order_id')
        
        payment = Payment.objects.filter(razorpay_order_id=order_id).first()
        if payment:
            payment.status = 'failed'
            payment.save()
            
            # Update subscription status
            if payment.subscription:
                payment.subscription.status = 'past_due'
                payment.subscription.save()
                
    except Exception as e:
        print(f"Error handling payment failure: {e}")


def handle_subscription_cancelled(subscription_data):
    """Handle subscription cancellation"""
    try:
        razorpay_sub_id = subscription_data.get('id')
        
        subscription = Subscription.objects.filter(
            razorpay_subscription_id=razorpay_sub_id
        ).first()
        
        if subscription:
            subscription.status = 'canceled'
            subscription.plan = 'free'
            subscription.save()
            
    except Exception as e:
        print(f"Error handling subscription cancellation: {e}")
