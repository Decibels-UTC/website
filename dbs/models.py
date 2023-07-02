from django.db import models

# Create your models here.

class Item(models.Model):
    name = models.CharField(max_length=120)
    marque = models.CharField(max_length=120, default=None, blank=True, null=True)
    prix = models.IntegerField(default=0, blank=False, null=False)
    description = models.TextField(default=None, blank=True, null=True)
    add_date = models.DateField()
    isRemoved = models.BooleanField(default=False)
    reasonRemove = models.TextField(default=None, blank=True, null=True)
    removeDate = models.DateField(default=None, blank=True, null=True)


    def _str_(self):
        return self.name
