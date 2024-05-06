from django import views
from django.conf import settings
from django.urls import path,include, re_path
from django.urls import re_path
from django.conf.urls.static import static
from . import views


urlpatterns = [
    path('signup', views.signup),
    path('login', views.login),
    path('logout', views.test_token),
    path('getuser', views.user_data_view, name='getuser'),
    path('updateimage', views.update_profile_image, name='updateimage'),
    path('media/profile_images/<str:filename>/', views.get_profile_image, name='get_profile_image'),
    path('edit-profile', views.edit_profile, name='edit-profile'),
    # path('sendMessage',views.sendMessage , name = 'send_message'),
    # path('getMessage/:discussion_id' , views.getMessage,name='get_message')
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

