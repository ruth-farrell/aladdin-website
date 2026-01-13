from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("careers", views.careers, name="careers"),
    path("misc", views.misc, name="misc"), 
    path("parents", views.parents, name="parents"), 
    path("ordernow", views.get_started, name="get_started"),
]