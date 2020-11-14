from django.contrib.auth.views import LoginView
from user_auth.forms import LoginForm
from django.urls import reverse_lazy

class Homepage(LoginView):
    template_name = 'index.html'
    authentication_form = LoginForm
    success_url = reverse_lazy('home')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if self.request.session.get('new_user'):
            del self.request.session['new_user']
            context['new_user'] = True
        else:
            context['new_user'] = False
        return context
