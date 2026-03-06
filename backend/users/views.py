from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, UserProfile
from .serializers import UserSerializer
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os

class AuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['post'])
    def register(self, request):
        email = request.data.get('email')
        password = request.data.get('password') or request.data.get('password1')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        
        # Validation
        if not email or not password:
            return Response(
                {'error': 'Email and password are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if User.objects.filter(email=email).exists():
            return Response(
                {'email': ['A user with this email already exists.']}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create user
        try:
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )
            
            # Create profile
            UserProfile.objects.create(user=user)
            
            return Response({
                'message': 'User created successfully',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response(
                {'error': 'Email and password are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = authenticate(username=email, password=password)
        
        if user:
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data
            return Response({
                'message': 'Login successful',
                'user': user_data,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        
        return Response(
            {'error': 'Invalid credentials'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    @action(detail=False, methods=['post'])
    def google_login(self, request):
        """
        Authenticate user with Google OAuth token
        Expects: { "token": "google_id_token" }
        """
        token = request.data.get('token')
        
        if not token:
            return Response(
                {'error': 'Google token is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Verify the Google token
            google_client_id = os.getenv('GOOGLE_CLIENT_ID')
            
            if not google_client_id:
                return Response(
                    {'error': 'Google OAuth not configured on server'},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE
                )
            
            # Verify token with Google
            idinfo = id_token.verify_oauth2_token(
                token, 
                google_requests.Request(), 
                google_client_id
            )
            
            # Token is valid, get user info
            email = idinfo.get('email')
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')
            google_id = idinfo.get('sub')
            picture = idinfo.get('picture', '')
            
            if not email:
                return Response(
                    {'error': 'Email not provided by Google'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Check if user exists
            user = User.objects.filter(email=email).first()
            
            if user:
                # User exists, log them in
                # Update avatar if available
                if picture and hasattr(user, 'profile'):
                    user.profile.avatar = picture
                    user.profile.save()
            else:
                # Create new user
                user = User.objects.create_user(
                    username=email,
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    password=None  # No password for OAuth users
                )
                
                # Set unusable password for OAuth users
                user.set_unusable_password()
                user.save()
                
                # Create profile
                UserProfile.objects.create(
                    user=user,
                    avatar=picture
                )
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data
            
            return Response({
                'message': 'Google login successful',
                'user': user_data,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'is_new_user': not User.objects.filter(email=email).exists()
            }, status=status.HTTP_200_OK)
            
        except ValueError as e:
            # Invalid token
            return Response(
                {'error': 'Invalid Google token'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            return Response(
                {'error': f'Authentication failed: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ProfileViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
