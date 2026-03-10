from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, UserProfile, Batch, StudentBatch
from .serializers import (
    UserSerializer, UserRegistrationSerializer, UserManagementSerializer, LoginSerializer,
    BatchSerializer, StudentBatchSerializer,
)
from .permissions import IsAdmin, IsStaffRole, IsAdminOrMentor
from django.db import models
import os


class AuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        try:
            user = User.objects.create_user(
                username=data['email'],
                email=data['email'],
                password=data['password'],
                first_name=data.get('first_name', ''),
                last_name=data.get('last_name', ''),
                role=data.get('role', User.Role.STUDENT),
                phone_number=data.get('phone_number', ''),
            )
            UserProfile.objects.create(user=user)

            return Response({
                'message': 'User created successfully',
                'user': UserSerializer(user).data,
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        identifier = serializer.validated_data['identifier'].strip()
        password = serializer.validated_data['password']
        selected_role = serializer.validated_data['selected_role']

        # Allow login via email OR username while keeping USERNAME_FIELD=email.
        # We resolve username -> email first, then authenticate against email.
        lookup = models.Q(email__iexact=identifier) | models.Q(username__iexact=identifier)
        found = User.objects.filter(lookup).only('id', 'email', 'role', 'is_active').first()

        if found is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(username=found.email, password=password)

        if user and user.is_active:
            # Validate dropdown role matches DB role
            if user.role != selected_role and not user.is_superuser:
                return Response(
                    {'error': 'Selected role does not match this account'},
                    status=status.HTTP_403_FORBIDDEN,
                )

            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data
            dashboard_map = {
                User.Role.ADMIN: '/dashboard/admin/',
                User.Role.STUDENT: '/dashboard/student/',
                User.Role.COLLEGE_STAFF: '/dashboard/staff/',
                User.Role.PARENT: '/dashboard/parent/',
                User.Role.MENTOR: '/dashboard/mentor/',
            }
            dashboard = dashboard_map.get(user.role, '/dashboard/')
            return Response({
                'message': 'Login successful',
                'user': user_data,
                'role': user.role,
                'dashboard': dashboard,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })

        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    @action(detail=False, methods=['post'])
    def google_login(self, request):
        """
        Authenticate user with Google OAuth token.
        Expects: { "token": "google_id_token" }
        """
        token = request.data.get('token')
        if not token:
            return Response(
                {'error': 'Google token is required'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            from google.oauth2 import id_token
            from google.auth.transport import requests as google_requests

            google_client_id = os.getenv('GOOGLE_CLIENT_ID')
            if not google_client_id:
                return Response(
                    {'error': 'Google OAuth not configured on server'},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE,
                )

            idinfo = id_token.verify_oauth2_token(
                token, google_requests.Request(), google_client_id
            )

            email = idinfo.get('email')
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')
            picture = idinfo.get('picture', '')

            if not email:
                return Response(
                    {'error': 'Email not provided by Google'},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = User.objects.filter(email=email).first()
            is_new = user is None

            if user:
                if picture and hasattr(user, 'profile'):
                    user.profile.avatar = picture
                    user.profile.save()
            else:
                user = User.objects.create_user(
                    username=email,
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    password=None,
                )
                user.set_unusable_password()
                user.save()
                UserProfile.objects.create(user=user, avatar=picture)

            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data

            return Response({
                'message': 'Google login successful',
                'user': user_data,
                'role': user.role,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'is_new_user': is_new,
            }, status=status.HTTP_200_OK)

        except ValueError:
            return Response(
                {'error': 'Invalid Google token'},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except Exception as e:
            return Response(
                {'error': f'Authentication failed: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ProfileViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def dashboard(self, request):
        """Return the dashboard route for the authenticated user's role."""
        user = request.user
        dashboard_map = {
            User.Role.ADMIN: '/dashboard/admin/',
            User.Role.STUDENT: '/dashboard/student/',
            User.Role.COLLEGE_STAFF: '/dashboard/staff/',
            User.Role.PARENT: '/dashboard/parent/',
            User.Role.MENTOR: '/dashboard/mentor/',
        }
        return Response({
            'role': user.role,
            'dashboard': dashboard_map.get(user.role, '/dashboard/'),
        })


# --------------- Admin-only User Management ---------------

class UserManagementViewSet(viewsets.ModelViewSet):
    """Admin-only: CRUD all users, assign roles."""
    serializer_class = UserManagementSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    queryset = User.objects.all().order_by('-date_joined')

    def get_queryset(self):
        qs = super().get_queryset()
        role = self.request.query_params.get('role')
        if role:
            qs = qs.filter(role=role)
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(
                models.Q(email__icontains=search)
                | models.Q(first_name__icontains=search)
                | models.Q(last_name__icontains=search)
            )
        return qs


class BatchViewSet(viewsets.ModelViewSet):
    """Manage batches (admin/mentor)."""
    serializer_class = BatchSerializer
    permission_classes = [IsAuthenticated, IsAdminOrMentor]
    queryset = Batch.objects.all()

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user
        # Mentors only see their own batches
        if user.role == User.Role.MENTOR and not user.is_superuser:
            qs = qs.filter(mentor=user)
        return qs


class StudentBatchViewSet(viewsets.ModelViewSet):
    """Manage student ↔ batch enrollment."""
    serializer_class = StudentBatchSerializer
    permission_classes = [IsAuthenticated, IsStaffRole]
    queryset = StudentBatch.objects.select_related('student', 'batch').all()
