from django.urls import path
from django.views.generic import RedirectView
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("careers", views.careers, name="careers"),
    path("misc", views.misc, name="misc"), 
    path("parents", views.parents, name="parents"), 
    path("ordernow", views.get_started, name="get_started"),
    # Back-compat: /sign-in should canonicalize to /signin
    path("sign-in", RedirectView.as_view(url="/signin", permanent=True)),
    path("sign-in/", RedirectView.as_view(url="/signin", permanent=True)),
]