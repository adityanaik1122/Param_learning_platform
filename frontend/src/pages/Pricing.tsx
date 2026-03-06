import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../shared/api/axios';
import { useAuth } from '../shared/hooks/useAuth';

interface PricingPlan {
  name: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
}

interface PricingData {
  plans: {
    monthly: PricingPlan;
    yearly: PricingPlan;
  };
  currency: string;
  currency_symbol: string;
}

// Declare Razorpay on window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Pricing() {
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // Cyberpunk theme colors
  const colors = {
    purple: '#8B5CF6',
    purpleLight: '#A78BFA',
    purpleDark: '#7C3AED',
    cyan: '#00F0FF',
    pink: '#FF10F0',
    gold: '#FBBF24',
  };

  const gradients = {
    purpleBlue: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)',
    purpleViolet: 'linear-gradient(135deg, #A855F7 0%, #8B5CF6 50%, #7C3AED 100%)',
  };

  const glows = {
    purple: '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)',
    purpleStrong: '0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.4)',
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const { data } = await apiClient.get('/payments/pricing/');
      setPricing(data);
    } catch (error) {
      console.error('Failed to fetch pricing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setProcessingPlan(plan);

    try {
      // Create Razorpay order
      const { data } = await apiClient.post('/payments/order/create/', { plan });

      // Initialize Razorpay checkout
      const options = {
        key: data.key_id,
        amount: data.amount * 100, // Amount in paise
        currency: data.currency,
        name: 'Param Learning Hub',
        description: `${plan === 'monthly' ? 'Monthly' : 'Yearly'} Premium Subscription`,
        order_id: data.order_id,
        prefill: {
          name: data.user_name,
          email: data.user_email,
          contact: data.user_contact
        },
        theme: {
          color: '#8B5CF6'
        },
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            await apiClient.post('/payments/payment/verify/', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: plan
            });

            showToast('Payment successful! Your subscription is now active.', 'success');
            setTimeout(() => navigate('/dashboard?payment=success'), 1500);
          } catch (error: any) {
            showToast(error.response?.data?.error || 'Payment verification failed', 'error');
          } finally {
            setProcessingPlan(null);
          }
        },
        modal: {
          ondismiss: function () {
            setProcessingPlan(null);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      showToast(error.response?.data?.error || 'Failed to create order', 'error');
      setProcessingPlan(null);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }} aria-live="polite" aria-busy="true">
        <div style={{ 
          color: '#8B5CF6', 
          fontSize: '1.5rem',
          textShadow: '0 0 10px rgba(139, 92, 246, 0.8)'
        }}>
          Loading pricing...
        </div>
      </div>
    );
  }

  if (!pricing) {
    return <div role="alert" style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>Failed to load pricing. Please try again later.</div>;
  }

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      {/* Toast notification */}
      {toast && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            position: 'fixed',
            top: '5rem',
            right: '2rem',
            zIndex: 1000,
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            background: toast.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${toast.type === 'success' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
            color: toast.type === 'success' ? '#10b981' : '#ef4444',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            maxWidth: '400px',
            animation: 'slideDown 0.3s ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{toast.type === 'success' ? '✓' : '✗'}</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '1.2rem' }}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '1rem',
          background: gradients.purpleBlue,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
        }}>
          Choose Your Plan
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '1.25rem' }}>
          Unlock the full potential of AI learning
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Free Plan */}
        <div style={{
          background: 'rgba(15, 20, 25, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '16px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}>
          <h3 style={{ 
            color: colors.purple, 
            fontSize: '1.5rem', 
            marginBottom: '0.5rem',
            textShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
          }}>
            Free
          </h3>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffffff' }}>
              {pricing.currency_symbol}0
            </span>
            <span style={{ color: '#9ca3af', fontSize: '1rem' }}>/forever</span>
          </div>
          
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            marginBottom: '2rem',
            flex: 1
          }}>
            <li style={{ padding: '0.75rem 0', color: '#e5e7eb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#10b981' }}>✓</span> Basic code execution
            </li>
            <li style={{ padding: '0.75rem 0', color: '#e5e7eb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#10b981' }}>✓</span> Access to free courses
            </li>
            <li style={{ padding: '0.75rem 0', color: '#e5e7eb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#10b981' }}>✓</span> Community support
            </li>
            <li style={{ padding: '0.75rem 0', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#6b7280' }}>✗</span> Limited AI features
            </li>
          </ul>
          
          <button
            disabled
            style={{
              padding: '0.55rem',
              borderRadius: '8px',
              border: '2px solid rgba(139, 92, 246, 0.3)',
              background: 'transparent',
              color: '#9ca3af',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'not-allowed'
            }}
          >
            Current Plan
          </button>
        </div>

        {/* Monthly Plan */}
        <div style={{
          background: 'rgba(15, 20, 25, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid rgba(139, 92, 246, 0.6)',
          borderRadius: '16px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: glows.purple
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: gradients.purpleBlue,
            padding: '0.25rem 1rem',
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.6)',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
          }}>
            POPULAR
          </div>
          
          <h3 style={{ 
            color: colors.purple, 
            fontSize: '1.5rem', 
            marginBottom: '0.5rem',
            textShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
          }}>
            Monthly Premium
          </h3>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffffff' }}>
              {pricing.currency_symbol}{pricing.plans.monthly.price}
            </span>
            <span style={{ color: '#9ca3af', fontSize: '1rem' }}>/month</span>
          </div>
          
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            marginBottom: '2rem',
            flex: 1
          }}>
            {pricing.plans.monthly.features.map((feature, idx) => (
              <li key={idx} style={{ 
                padding: '0.75rem 0', 
                color: '#e5e7eb', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#10b981' }}>✓</span> {feature}
              </li>
            ))}
          </ul>
          
          <button
            onClick={() => handleSubscribe('monthly')}
            disabled={processingPlan === 'monthly'}
            style={{
              padding: '0.55rem',
              borderRadius: '8px',
              border: 'none',
              background: gradients.purpleBlue,
              color: 'white',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: processingPlan === 'monthly' ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: processingPlan === 'monthly' ? 0.7 : 1,
              boxShadow: glows.purple,
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
            onMouseEnter={(e) => {
              if (processingPlan !== 'monthly') {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = glows.purpleStrong;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = glows.purple;
            }}
          >
            {processingPlan === 'monthly' ? 'Processing...' : 'Subscribe Now'}
          </button>
        </div>

        {/* Yearly Plan */}
        <div style={{
          background: 'rgba(15, 20, 25, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '16px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '1rem',
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid rgba(16, 185, 129, 0.5)',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            color: '#10b981'
          }}>
            SAVE {pricing.currency_symbol}{pricing.plans.monthly.price * 12 - pricing.plans.yearly.price}
          </div>
          
          <h3 style={{ 
            color: colors.purple, 
            fontSize: '1.5rem', 
            marginBottom: '0.5rem',
            textShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
          }}>
            Yearly Premium
          </h3>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffffff' }}>
              {pricing.currency_symbol}{pricing.plans.yearly.price}
            </span>
            <span style={{ color: '#9ca3af', fontSize: '1rem' }}>/year</span>
          </div>
          
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            marginBottom: '2rem',
            flex: 1
          }}>
            {pricing.plans.yearly.features.map((feature, idx) => (
              <li key={idx} style={{ 
                padding: '0.75rem 0', 
                color: '#e5e7eb', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#10b981' }}>✓</span> {feature}
              </li>
            ))}
          </ul>
          
          <button
            onClick={() => handleSubscribe('yearly')}
            disabled={processingPlan === 'yearly'}
            style={{
              padding: '0.55rem',
              borderRadius: '8px',
              border: `2px solid ${colors.purple}`,
              background: 'transparent',
              color: colors.purple,
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: processingPlan === 'yearly' ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: processingPlan === 'yearly' ? 0.7 : 1,
              textShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
            }}
            onMouseEnter={(e) => {
              if (processingPlan !== 'yearly') {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {processingPlan === 'yearly' ? 'Processing...' : 'Subscribe Now'}
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ marginTop: '5rem', maxWidth: '800px', margin: '5rem auto 0' }}>
        <h2 style={{ 
          textAlign: 'center', 
          color: colors.purple, 
          fontSize: '2rem', 
          marginBottom: '2rem',
          textShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
        }}>
          Frequently Asked Questions
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'rgba(15, 20, 25, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
          }}>
            <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
              Can I cancel anytime?
            </h4>
            <p style={{ color: '#9ca3af', margin: 0 }}>
              Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
            </p>
          </div>
          
          <div style={{
            background: 'rgba(15, 20, 25, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
          }}>
            <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
              What payment methods do you accept?
            </h4>
            <p style={{ color: '#9ca3af', margin: 0 }}>
              We accept UPI, credit/debit cards, net banking, and wallets through Razorpay's secure payment gateway.
            </p>
          </div>
          
          <div style={{
            background: 'rgba(15, 20, 25, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
          }}>
            <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
              Is there a refund policy?
            </h4>
            <p style={{ color: '#9ca3af', margin: 0 }}>
              We offer a 7-day money-back guarantee. If you're not satisfied, contact us for a full refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
