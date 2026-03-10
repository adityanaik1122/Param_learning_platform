from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="role",
            field=models.CharField(
                choices=[
                    ("ADMIN", "Admin"),
                    ("STUDENT", "Student"),
                    ("COLLEGE_STAFF", "College Staff"),
                    ("PARENT", "Parent"),
                    ("MENTOR", "Institute Mentor"),
                ],
                default="STUDENT",
                max_length=32,
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="phone_number",
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="employee_id",
            field=models.CharField(blank=True, max_length=50, null=True, unique=True),
        ),
        migrations.AddField(
            model_name="user",
            name="department",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="linked_students",
            field=models.ManyToManyField(
                blank=True,
                related_name="linked_parents",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="address",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="date_of_birth",
            field=models.DateField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name="Batch",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200)),
                ("course", models.CharField(max_length=200)),
                ("description", models.TextField(blank=True)),
                ("start_date", models.DateField()),
                ("end_date", models.DateField(blank=True, null=True)),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "mentor",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="mentored_batches",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Batches",
                "ordering": ["-start_date"],
            },
        ),
        migrations.CreateModel(
            name="StudentBatch",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("enrollment_date", models.DateField(auto_now_add=True)),
                ("is_active", models.BooleanField(default=True)),
                (
                    "batch",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="enrolled_students",
                        to="users.batch",
                    ),
                ),
                (
                    "student",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="enrolled_batches",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Student Batches",
                "unique_together": {("student", "batch")},
            },
        ),
    ]

