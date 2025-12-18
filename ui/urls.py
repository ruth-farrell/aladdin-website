from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("careers", views.careers, name="careers"),
    path("misc", views.misc, name="misc"), 
    path("parents", views.parents, name="parents"), 
]