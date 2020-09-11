from django.views.generic import TemplateView
from django.views.generic import CreateView

class Login(TemplateView):
    template_name = 'login.html'

class SignUp(TemplateView):
    template_name = 'signup.html'