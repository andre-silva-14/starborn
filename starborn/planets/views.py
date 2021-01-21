from typing import Any, Dict
from .models import Planet
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView

# Create your views here.

class PlanetView(TemplateView):
    template_name = 'planet_detail.html'

    def get_context_data(self, **kwargs: Any) -> Dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context['planet'] = get_object_or_404(Planet, name=kwargs.get('planet', None))
        context['planet_image'] = f"images/{context['planet']}.png"
        return context