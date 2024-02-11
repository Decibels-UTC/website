"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include,re_path
from app.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', ItemView.as_view(), name="Main"),
    path('api/items/<int:pk>/', ItemView.as_view(), name='item-update'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/user/', UserView.as_view(), name='user info'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/history/', HistoryView.as_view(), name="historique"),
    path('api/verify-token/', VerifyTokenView.as_view(), name='verify-token'),
]
