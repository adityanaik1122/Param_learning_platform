from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('syllabus', '0003_courseprogress'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courseprogress',
            name='course_id',
            field=models.CharField(
                choices=[
                    ('mern', 'Full Stack Web Development - MERN Stack'),
                    ('python-fullstack', 'Full Stack Web Development - Python'),
                    ('java-fullstack', 'Full Stack Web Development - Java'),
                    ('mean', 'Full Stack Web Development - .Net & Angular'),
                    ('react-native', 'Mobile App Development - React Native'),
                    ('data-analytics', 'Data Analytics'),
                    ('ai-ml', 'Data Science and AI/ML'),
                    ('iot-ai', 'AI/ML Integration with IOT'),
                    ('design-engineering', 'Design Engineering - UI/UX & Frontend Development'),
                    ('game-development', 'Game Development - C# and Unity'),
                ],
                max_length=50,
            ),
        ),
    ]
