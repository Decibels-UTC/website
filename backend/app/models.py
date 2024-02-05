from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.
class Item(models.Model):
    TYPES_CHOICES1 = [
        ('light', 'Light'),
        ('son', 'Son'),
        ('structure', 'Structure'),
        ('autre', 'Autre'),
    ]
    TYPES_CHOICES2 = [
        ('neuf', 'Neuf'),
        ('use', 'Usé'),
        ('reparable', 'Réparable'),
        ('casse', 'Cassé'),
    ]
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length = 150)
    brand = models.CharField(max_length = 150, null=True, blank=True)
    price = models.FloatField(validators=[MinValueValidator(0)])
    state = models.CharField(max_length=20, choices=TYPES_CHOICES2, default='neuf')
    power = models.IntegerField(validators=[MinValueValidator(0)],default=0)
    quantity = models.IntegerField(validators=[MinValueValidator(0)])
    modification_reason = models.CharField(max_length = 500, null=True, blank=True)
    type = models.CharField(max_length=20, choices=TYPES_CHOICES1)
    creation = models.DateTimeField(auto_now=True)
    removed = models.DateTimeField(null=True, blank=True)
    modification_date = models.DateTimeField(auto_now=True)





















