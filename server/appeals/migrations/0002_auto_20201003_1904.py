# Generated by Django 3.1.2 on 2020-10-03 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appeals', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appeal',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
        migrations.DeleteModel(
            name='Document',
        ),
    ]