from django.http import HttpResponse
from django.shortcuts import render_to_response

# 表单
def search_form(request):
    return render_to_response('search_form.html')

# 接受请求数据
def search(request):
    request.encoding = 'utf-8'
    if 'q' in request.GET:
        message = 'you search info is :' + request.GET['q']
    else:
        message = 'you had commited a blank form'
    return HttpResponse(message)
