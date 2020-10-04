from django.urls import path

from appeals.views import AppealListCreateAPI, AppealRetrieveUpdateCancelAPI, AppealSaveDocumentAPI, AppealSendAPI, AppealTestAPI

urlpatterns = [
    path('', AppealListCreateAPI.as_view(), name='appeals'),
    path('<int:id>', AppealRetrieveUpdateCancelAPI.as_view(), name='appeal'),
    path('<int:id>/file', AppealSaveDocumentAPI.as_view(), name='appeal_file'),
    path('<int:id>/send', AppealSendAPI.as_view(), name='appeal_send'),
    path('test/<str:text>', AppealTestAPI.as_view(), name='appeal_test')
]
