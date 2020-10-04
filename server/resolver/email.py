import datetime

from django.conf import settings
from django.core.mail import send_mail

APPEAL_ACCEPTED_EMAIL_TITLE = 'Ваша заявка принята'
APPEAL_POLICE_EMAIL_TITLE = 'Заявление о жестоком обращении с животными'


def generate_appeal_accepted_email(email, description):
    return Email(
        email,
        APPEAL_ACCEPTED_EMAIL_TITLE,
        description
    )


def generate_appeal_police_email(description):
    return Email(
        Email.POLICE_RECEIVER_EMAIL,
        APPEAL_POLICE_EMAIL_TITLE,
        description
    )


class Email:
    POLICE_RECEIVER_EMAIL = 'letchmagadan@mail.ru'

    def __init__(self, receiver, subject, message):
        self.receiver = receiver
        self.subject = subject
        self.message = message

    def send(self):
        print(self.receiver, '\n', self.subject, '\n', self.message)
        # send_mail(
        #     self.subject,
        #     self.message,
        #     settings.EMAIL_HOST_USER,
        #     [self.receiver],
        #     fail_silently=False,
        # )
