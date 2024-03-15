from rest_framework import serializers
from . models import *
from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import gettext_lazy as _


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id','name' , 'brand','state','power', 'price','type', 'quantity','description','pretable', 'modification_reason', 'creation', 'removed', 'modification_date']


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'), username=username, password=password)
            if not user:
                msg = _('Unable to authenticate with provided credentials')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs




class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ['date','user','action']
