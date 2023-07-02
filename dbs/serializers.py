from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name', 'marque','prix', 'description', 'add_date', 'isRemoved', 'reasonRemove', 'removeDate')
