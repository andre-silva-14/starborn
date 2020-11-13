from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import User


class LoginForm(AuthenticationForm):
    password = forms.CharField()

    class Meta():
        fields = ('username',)
        model = User

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field_name in self.fields:
            self.fields[field_name].label = ''
            self.fields[field_name].help_text = ''

        self.fields['username'].widget.attrs.update(
                    {'class':'login-input',
                    'placeholder':'Username',
                    'spellcheck':'false',
                    'autocomplete': 'off',
                    })
        self.fields['password'].widget.attrs.update(
                    {'class':'login-input',
                    'placeholder':'Password',
                    'spellcheck':'false',
                    'autocomplete': 'off',
                    })


class LargerLoginForm(AuthenticationForm):
    password = forms.CharField()

    class Meta():
        fields = ('username',)
        model = User

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field_name in self.fields:
            self.fields[field_name].label = ''
            self.fields[field_name].help_text = ''

        self.fields['username'].widget.attrs.update(
                    {'class':'larger-login-input',
                    'placeholder':'Username',
                    'spellcheck':'false',
                    'autocomplete': 'off',
                    })
        self.fields['password'].widget.attrs.update(
                    {'class':'larger-login-input',
                    'placeholder':'Password',
                    'spellcheck':'false',
                    'autocomplete': 'off',
                    })
