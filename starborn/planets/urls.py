from django.urls import path
from .views import PlanetView

urlpatterns = [
    path('<str:planet>/', PlanetView.as_view(), name='planet_detail')
]
