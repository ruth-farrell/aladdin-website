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

def set_up(request):
    return render(request, "set-up.html")