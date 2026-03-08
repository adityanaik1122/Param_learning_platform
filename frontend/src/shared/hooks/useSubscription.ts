import { useState, useEffect } from 'react';
import { apiClient } from '../api/axios';

interface SubscriptionStatus {
  active: boolean;
  plan: string;
  expires_at?: string;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionStatus>({
    active: false,
    plan: 'free',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptionStatus();

    // Listen for subscription required events
    const handleSubscriptionRequired = () => {
      setSubscription({ active: false, plan: 'free' });
    };

    window.addEventListener('subscription-required', handleSubscriptionRequired);
    return () => window.removeEventListener('subscription-required', handleSubscriptionRequired);
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      const { data } = await apiClient.get('/payments/subscription/status/');
      setSubscription(data);
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCheckoutSession = async (plan: string) => {
    try {
      const { data } = await apiClient.post('/payments/create_order/', {
        plan
      });
      
      // Initialize Razorpay
      const options = {
        key: data.key_id,
        amount: data.amount * 100,
        currency: data.currency,
        name: 'Param Learning Hub',
        description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Subscription`,
        order_id: data.order_id,
        prefill: {
          name: data.user_name,
          email: data.user_email,
          contact: data.user_contact
        },
        theme: {
          color: '#3b82f6'
        },
        handler: async function (response: any) {
          try {
            // Verify payment
            await apiClient.post('/payments/verify_payment/', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: plan
            });
            
            // Refresh subscription status
            await fetchSubscriptionStatus();
            
            // Show success message
            alert('Payment successful! Your premium subscription is now active.');
            window.location.href = '/dashboard';
          } catch (error: any) {
            console.error('Payment verification failed:', error);
            alert(error.response?.data?.error || 'Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: function() {
            console.log('Payment cancelled by user');
          }
        }
      };
      
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
      
    } catch (error: any) {
      console.error('Failed to create order:', error);
      const errorMessage = error.response?.data?.error || 'Failed to initiate payment';
      alert(errorMessage);
      throw error;
    }
  };

  return { subscription, loading, createCheckoutSession, refetch: fetchSubscriptionStatus };
};
