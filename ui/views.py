from django.shortcuts import render

def home(request):
    return render(request, "ui/home.html")

def careers(request):
    return render(request, "ui/careers.html")

def parents(request):
    return render(request, "ui/parents.html")

def misc(request):
    return render(request, "ui/misc.html")