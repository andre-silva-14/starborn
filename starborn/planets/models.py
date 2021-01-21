from django.db import models

# Create your models here.


class Planet(models.Model):
    name = models.CharField(max_length=36)
    inclination = models.DecimalField(decimal_places=3, max_digits=6)
    radius = models.DecimalField(decimal_places=1, max_digits=20)
    mass = models.CharField(max_length=100)
    average_orbital_speed = models.DecimalField(decimal_places=3, max_digits=10)
    orbital_period = models.DecimalField(decimal_places=9, max_digits=20)


    def __str__(self):
        return self.name