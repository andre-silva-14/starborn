from django.views.generic import FormView
from user_auth.forms import LoginForm

class Homepage(FormView):
    template_name = 'index.html'
    form_class = LoginForm
