from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    subscription_status = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'subscription_status']
    
    def get_subscription_status(self, obj):
        # Check user's subscription from payments app
        try:
            from payments.models import Subscription
            subscription = Subscription.objects.filter(user=obj, is_active=True).first()
            if subscription:
                return {
                    'active': True,
                    'plan': subscription.plan,
                    'expires_at': subscription.expires_at.isoformat() if subscription.expires_at else None
                }
        except:
            pass
        
        return {'active': False, 'plan': 'free'}
