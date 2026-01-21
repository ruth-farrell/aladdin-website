from django.urls import path
from django.views.generic import RedirectView
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("index.html", views.index, name="index_html"),

    path("careers.html", views.careers, name="careers_html"),
    path("misc.html", views.misc, name="misc_html"),
    path("parents.html", views.parents, name="parents_html"),
    path("ordernow.html", views.get_started, name="get_started_html"),

    # Back-compat: no-extension URLs should canonicalize to .html
    path("careers", RedirectView.as_view(url="/careers.html", permanent=True)),
    path("careers/", RedirectView.as_view(url="/careers.html", permanent=True)),
    path("misc", RedirectView.as_view(url="/misc.html", permanent=True)),
    path("misc/", RedirectView.as_view(url="/misc.html", permanent=True)),
    path("parents", RedirectView.as_view(url="/parents.html", permanent=True)),
    path("parents/", RedirectView.as_view(url="/parents.html", permanent=True)),
    path("ordernow", RedirectView.as_view(url="/ordernow.html", permanent=True)),
    path("ordernow/", RedirectView.as_view(url="/ordernow.html", permanent=True)),
]