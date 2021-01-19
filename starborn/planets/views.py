from typing import Any, Dict
from django import template
from django.views.generic import TemplateView

# Create your views here.

class PlanetView(TemplateView):
    template_name = 'planet_detail.html'

    def get_context_data(self, **kwargs: Any) -> Dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context['planet'] = kwargs.get('planet', None)
        context['planet_image'] = f"images/{context['planet']}.png"
        return context