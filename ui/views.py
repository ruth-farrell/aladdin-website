from django.shortcuts import render

def home(request):
    return render(request, "home.html")

def careers(request):
    return render(request, "careers.html")

def parents(request):
    return render(request, "parents.html")

def misc(request):
    return render(request, "misc.html")

def home_testing(request):
    return render(request, "home-testing.html")

def get_started(request):
    return render(request, "get-started.html")