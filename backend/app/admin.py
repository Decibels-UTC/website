from django.contrib import admin
from .models import Item

# Register your models here.
class ItemAdmin(admin.ModelAdmin):
    list_display = ('id','name' , 'brand','state','power', 'price','type', 'quantity', 'modification_reason', 'creation', 'removed', 'modification_date')

# Register your models here.

admin.site.register(Item, ItemAdmin)
