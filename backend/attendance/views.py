from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q
from datetime import date

from .models import Attendance, LeaveRequest
from .serializers import AttendanceSerializer, LeaveRequestSerializer, BulkAttendanceSerializer
from users.permissions import IsAdmin, IsAdminOrTeacher, IsStaffRole
from users.models import User


class AttendanceViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]
    queryset = Attendance.objects.select_related('user', 'marked_by', 'batch').all()

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user

        # Students see only their own attendance
        if user.role == User.Role.STUDENT:
            qs = qs.filter(user=user)
        # Parents see their linked students
        elif user.role == User.Role.PARENT:
            linked_ids = user.linked_students.values_list('id', flat=True)
            qs = qs.filter(user_id__in=linked_ids)
        # Teachers see their batch students
        elif user.role == User.Role.COLLEGE_STAFF:
            qs = qs.filter(batch__in=user.mentored_batches.all())

        # Optional filters
        batch_id = self.request.query_params.get('batch')
        if batch_id:
            qs = qs.filter(batch_id=batch_id)
        date_from = self.request.query_params.get('date_from')
        if date_from:
            qs = qs.filter(date__gte=date_from)
        date_to = self.request.query_params.get('date_to')
        if date_to:
            qs = qs.filter(date__lte=date_to)
        student_id = self.request.query_params.get('student')
        if student_id and user.role in [User.Role.ADMIN, User.Role.COLLEGE_STAFF, User.Role.MENTOR]:
            qs = qs.filter(user_id=student_id)

        return qs

    def perform_create(self, serializer):
        serializer.save(marked_by=self.request.user)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated, IsAdminOrTeacher])
    def mark_bulk(self, request):
        """Mark attendance for multiple students in a batch."""
        serializer = BulkAttendanceSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        created = []
        for record in data['records']:
            obj, _ = Attendance.objects.update_or_create(
                user_id=record['user_id'],
                date=data['date'],
                defaults={
                    'status': record.get('status', 'present'),
                    'check_in': record.get('check_in'),
                    'check_out': record.get('check_out'),
                    'remarks': record.get('remarks', ''),
                    'marked_by': request.user,
                    'batch_id': data['batch_id'],
                },
            )
            created.append(obj.id)

        return Response({
            'message': f'Attendance marked for {len(created)} students',
            'count': len(created),
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def report(self, request):
        """Attendance summary report (filterable by batch, date range)."""
        batch_id = request.query_params.get('batch')
        date_from = request.query_params.get('date_from')
        date_to = request.query_params.get('date_to', str(date.today()))

        qs = Attendance.objects.all()
        if batch_id:
            qs = qs.filter(batch_id=batch_id)
        if date_from:
            qs = qs.filter(date__gte=date_from)
        if date_to:
            qs = qs.filter(date__lte=date_to)

        summary = qs.values('user__email', 'user__first_name', 'user__last_name').annotate(
            total_days=Count('id'),
            present=Count('id', filter=Q(status='present')),
            absent=Count('id', filter=Q(status='absent')),
            late=Count('id', filter=Q(status='late')),
            half_day=Count('id', filter=Q(status='half_day')),
        ).order_by('user__email')

        return Response(list(summary))


class LeaveRequestViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveRequestSerializer
    permission_classes = [IsAuthenticated]
    queryset = LeaveRequest.objects.select_related('user', 'approved_by').all()

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user
        if user.role == User.Role.STUDENT:
            qs = qs.filter(user=user)
        elif user.role == User.Role.PARENT:
            linked_ids = user.linked_students.values_list('id', flat=True)
            qs = qs.filter(user_id__in=linked_ids)
        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated, IsStaffRole])
    def approve(self, request, pk=None):
        """Approve or reject a leave request."""
        leave = self.get_object()
        new_status = request.data.get('status')
        if new_status not in ['approved', 'rejected']:
            return Response(
                {'error': 'Status must be "approved" or "rejected"'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        leave.status = new_status
        leave.approved_by = request.user
        leave.reviewer_remarks = request.data.get('remarks', '')
        leave.save()

        return Response(LeaveRequestSerializer(leave).data)
