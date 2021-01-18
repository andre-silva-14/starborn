from django.db import models

# Create your models here.


class Planet(models.Model):
    name = models.CharField(max_length=36)