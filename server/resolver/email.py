import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from django.conf import settings
from django.core.mail import send_mail


class Email:
    RECEIVER_EMAIL = ''

    def __init__(self, subject, message):
        self.subject = subject
        self.message = message

    def send(self):
        send_mail(
            self.subject,
            self.message,
            settings.EMAIL_HOST_USER,
            [self.RECEIVER_EMAIL],
            fail_silently=False,
        )
