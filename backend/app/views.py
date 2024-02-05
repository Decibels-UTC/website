from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from django.shortcuts import get_object_or_404
from . serializer import *
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timezone
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from datetime import timedelta





# Create your views here.


class ItemView(APIView):
    def get(self, request):
        output = [
            {"id":output.id,
            "name" : output.name,
            "brand" : output.brand,
            "price" : output.price,
            "power" : output.power,
            "type": output.type,
            "state": output.state,
            "quantity" : output.quantity,
            "modification_reason" : output.modification_reason,
            "creation" : output.creation,
            "removed" : output.removed,
            "modification_date" : output.modification_date,
             }
        for output in Item.objects.all()
        ]

        return Response(output)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def put(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        if(item.name != None):
            item.name = request.data.get("name", item.name)
        if (item.brand != None):
            item.brand = request.data.get("brand", item.brand)
        if (item.price != None):
            item.price = request.data.get("price", item.price)
        if (item.type != None):
            item.type = request.data.get("type", item.type)
        if (item.quantity != None):
            item.quantity = request.data.get("quantity", item.quantity)
            if(item.quantity == 0):
                item.removed = datetime.now(timezone.utc);
        if (item.modification_reason != None):
            item.modification_reason = request.data.get("modification_reason", item.modification_reason)
            if item.modification_reason == "item deleted":
                item.removed = datetime.now(timezone.utc);
        if (item.state != None):
            item.state = request.data.get("state", item.state)
        if (item.power != None):
            item.power = request.data.get("power", item.power)

        item.save()

        return Response({
            "id":item.id,
            "name" : item.name,
            "brand" : item.brand,
            "price" : item.price,
            "power" : item.power,
            "type": item.type,
            "state": item.state,
            "quantity" : item.quantity,
            "modification_reason" : item.modification_reason,
            "creation" : item.creation,
            "removed" : item.removed,
            "modification_date" : item.modification_date}
            )




class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(data=self.request.data, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)

        # Générer un token pour l'utilisateur authentifié
        token, created = Token.objects.get_or_create(user=user)

        # Définir une date d'expiration pour le token
        expiry_duration = timedelta(minutes=30) # Le token expire après 30 minutes
        token.expires = datetime.now() + expiry_duration
        token.save()

        # Renvoyer le token dans la réponse
        return Response({'token': token.key}, status=status.HTTP_200_OK)

class LogoutView(APIView):
    def post(self, request, format=None):
        if request.user.is_authenticated:
            request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

class VerifyTokenView(APIView):
    def get(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', '')[6:] # Retirez 'Token ' du début
        try:
            token_obj = Token.objects.get(key=token)
            user = User.objects.get(id=token_obj.user_id)
            return Response({'user': user.username})
        except Token.DoesNotExist:
            return Response({'error': 'Token does not exist'}, status=401)