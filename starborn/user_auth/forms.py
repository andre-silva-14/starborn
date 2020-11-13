from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from .models import User


class LoginForm(AuthenticationForm):
    password = forms.CharField(widget=forms.PasswordInput)

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
    password = forms.CharField(widget=forms.PasswordInput)

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


class SignUpForm(UserCreationForm):
    password1 = forms.CharField(widget=forms.PasswordInput)
    password2 = forms.CharField(widget=forms.PasswordInput)

    class Meta():
        fields = ('username', 'email',)
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
        self.fields['email'].widget.attrs.update(
                    {'class':'larger-login-input',
                    'placeholder':'E-mail',
                    'spellcheck':'false',
                    'autocomplete': 'off',
                    })
        self.fields['password1'].widget.attrs.update(
                    {'class':'larger-login-input',
                    'placeholder':'Password',
                    'spellcheck':'false',
                    'autocomplete': 'off',
                    })
        self.fields['password2'].widget.attrs.update(
                    {'class':'larger-login-input',
                    'placeholder':'Confirm Password',
                    'spellcheck':'false',
                    'autocomplete': 'off',
                    })

    def clean_password2(self):
        "Check that the two password entries match"
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords must match")
        return password2

    def save(self, commit=True):
        "Save the provided password in hashed format"
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user
