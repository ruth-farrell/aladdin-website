from django.shortcuts import render

def index(request):
    return render(request, "index.html")

def careers(request):
    return render(request, "careers.html")

def parents(request):
    return render(request, "parents.html")

def misc(request):
    return render(request, "misc.html")

def get_started(request):
    return render(request, "ordernow.html")