from rest_framework import serializers
from . models import *

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id','name' , 'brand', 'price', 'quantity', 'modification_reason', 'creation', 'removed', 'modification_date']


