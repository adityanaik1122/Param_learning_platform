from django.urls import path
from .views import PaymentViewSet, razorpay_webhook

urlpatterns = [
    # Pricing and subscription
    path('pricing/', PaymentViewSet.as_view({'get': 'pricing'}), name='pricing'),
    path('subscription/status/', PaymentViewSet.as_view({'get': 'subscription_status'}), name='subscription_status'),
    path('subscription/cancel/', PaymentViewSet.as_view({'post': 'cancel_subscription'}), name='cancel_subscription'),
    
    # Razorpay
    path('order/create/', PaymentViewSet.as_view({'post': 'create_order'}), name='create_order'),
    path('payment/verify/', PaymentViewSet.as_view({'post': 'verify_payment'}), name='verify_payment'),
    
    # Payment history
    path('history/', PaymentViewSet.as_view({'get': 'payment_history'}), name='payment_history'),
    
    # Webhooks
    path('webhook/razorpay/', razorpay_webhook, name='razorpay_webhook'),
]
