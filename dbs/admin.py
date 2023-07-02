from django.contrib import admin
from .models import Item

class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'marque','prix', 'description', 'add_date', 'isRemoved', 'reasonRemove', 'removeDate')

# Register your models here.

admin.site.register(Item, ItemAdmin)
