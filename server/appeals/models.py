from django.db import models

from users.models import User


class Appeal(models.Model):
    STATUS_NEW = 'new'
    STATUS_PENDING = 'pending'
    STATUS_CANCELED = 'canceled'
    STATUS_DONE = 'done'

    STATUSES = [
        STATUS_NEW,
        STATUS_PENDING,
        STATUS_CANCELED,
        STATUS_DONE,
    ]

    STATUS_CHOICES = [(status, status) for status in STATUSES]

    status = models.CharField(choices=STATUS_CHOICES, default=STATUS_NEW, max_length=32, db_index=True)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appeals')
    fio = models.TextField()
    reason = models.TextField()
    text = models.TextField()
    file = models.FileField(null=True, blank=True)
    description = models.TextField()
