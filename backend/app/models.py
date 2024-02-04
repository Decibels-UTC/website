from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Item(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length = 150)
    brand = models.CharField(max_length = 150, null=True, blank=True)
    price = models.IntegerField(validators=[MinValueValidator(0)])
    quantity = models.IntegerField(validators=[MinValueValidator(0)])
    modification_reason = models.CharField(max_length = 500, null=True, blank=True)
    creation = models.DateTimeField(auto_now=True)
    removed = models.DateTimeField(null=True, blank=True)
    modification_date = models.DateTimeField(auto_now=True)


