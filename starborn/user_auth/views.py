from django.views.generic import FormView, CreateView, View
from django.contrib.auth.views import LoginView
from .forms import LargerLoginForm, SignUpForm
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy

class Login(LoginView):
    template_name = 'login.html'
    authentication_form = LargerLoginForm
    success_url = reverse_lazy('home')

class Logout(View):
    success_url = reverse_lazy('home')
    
    def get(self, request):
        logout(request)

        return HttpResponseRedirect(self.success_url)

class SignUp(CreateView):
    template_name = 'signup.html'
    form_class = SignUpForm
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        form.clean_password2()
        form.save()

        username = self.request.POST['username']
        password = self.request.POST['password1']

        auth = authenticate(username=username, password=password)
        login(self.request, auth)
        return HttpResponseRedirect(self.success_url)
