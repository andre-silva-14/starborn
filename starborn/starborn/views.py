from django.views.generic import FormView
from user_auth.forms import LoginForm
from django.urls import reverse_lazy

class Homepage(FormView):
    template_name = 'index.html'
    form_class = LoginForm
    success_url = reverse_lazy('home')
