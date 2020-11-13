from django.views.generic import FormView, TemplateView
from .forms import LargerLoginForm

class Login(FormView):
    template_name = 'login.html'
    form_class = LargerLoginForm

class SignUp(TemplateView):
    template_name = 'signup.html'