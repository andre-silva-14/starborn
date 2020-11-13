from django.contrib.auth.views import LoginView
from user_auth.forms import LoginForm
from django.urls import reverse_lazy

class Homepage(LoginView):
    template_name = 'index.html'
    authentication_form = LoginForm
    success_url = reverse_lazy('home')
