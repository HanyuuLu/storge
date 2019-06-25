from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.views.decorators import csrf

# 表单
def search_form(request):
    return render_to_response('search_form.html')

# 接受请求数据
def search(request):
    request.encoding = 'utf-8'
    if 'secCon' in request.GET:
        message = 'you search info is :' + \
            request.GET['secCon']+request.GET['secAdd']
    else:
        message = 'you had commited a blank form'
    return HttpResponse(message)

# 接受请求数据POST
def search_post(request):
    ctx = {}
    if request.POST:
        ctx['rlt'] = request.POST['conText']
    return render(request,"post.html",ctx)
