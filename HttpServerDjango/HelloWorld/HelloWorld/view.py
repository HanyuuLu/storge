from django.http import HttpResponse
from django.shortcuts import render

def hello(request):
    return HttpResponse("Hello!")
def response(request):
    context = {}
    context['hello'] = 'Hello world from Hanyuu'
    return render(request,'response.html',context)