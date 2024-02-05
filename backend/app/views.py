from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from django.shortcuts import get_object_or_404
from . serializer import *
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timezone,timedelta
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.utils import timezone as dj_timezone






# Create your views here.

permission_classes = (IsAuthenticated,)

from rest_framework.exceptions import AuthenticationFailed

class ItemView(APIView):
    def get(self, request):
        # Check if the request contains an Authorization header with a token
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header and auth_header.startswith('Token '):
            token_key = auth_header[6:]  # Remove 'Token ' prefix
            try:
                # Attempt to retrieve the token object
                token = Token.objects.get(key=token_key)
                # Define the token expiration duration
                token_expiration_duration = timedelta(hours=1)  # Example: tokens expire after 1 hour
                # Check if the token is valid (not expired)
                if token.created > dj_timezone.now() - token_expiration_duration:
                    # Proceed with the request handling
                    output = [
                        {
                            "id": item.id,
                            "name": item.name,
                            "brand": item.brand,
                            "price": item.price,
                            "power": item.power,
                            "type": item.type,
                            "state": item.state,
                            "quantity": item.quantity,
                            "modification_reason": item.modification_reason,
                            "creation": item.creation,
                            "removed": item.removed,
                            "modification_date": item.modification_date,
                        }
                        for item in Item.objects.all()
                    ]
                    return Response(output)
                else:
                    raise AuthenticationFailed('Token has expired')
            except Token.DoesNotExist:
                raise AuthenticationFailed('Invalid token')
        else:
            raise AuthenticationFailed('Authentication credentials were not provided')


    def post(self, request):
        # Check if the request contains an Authorization header with a token
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header and auth_header.startswith('Token '):
            token_key = auth_header[6:] # Remove 'Token ' prefix
            try:
                token = Token.objects.get(key=token_key)
                token_expiration_duration = timedelta(hours=1) # Example: tokens expire after 1 hour
                if token.created > dj_timezone.now() - token_expiration_duration:
                    serializer = ItemSerializer(data=request.data)
                    if serializer.is_valid(raise_exception=True):
                        serializer.save()
                        return Response(serializer.data)
                else:
                    raise AuthenticationFailed('Token has expired')
            except Token.DoesNotExist:
                raise AuthenticationFailed('Invalid token')
        else:
            raise AuthenticationFailed('Authentication credentials were not provided')

    def put(self, request, pk):
                auth_header = request.META.get('HTTP_AUTHORIZATION')
                if auth_header and auth_header.startswith('Token '):
                    token_key = auth_header[6:]
                    try:
                        token = Token.objects.get(key=token_key)
                        token_expiration_duration = timedelta(hours=1)  # Example: tokens expire after 1 hour
                        if token.created > dj_timezone.now() - token_expiration_duration:
                            try:
                                item = Item.objects.get(pk=pk)
                            except Item.DoesNotExist:
                                return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)
                            if (request.data.get("name") != None):
                                item.name = request.data.get("name")
                            if (request.data.get("brand") != None):
                                item.brand = request.data.get("brand")
                            if (request.data.get("price") != None):
                                item.price = request.data.get("price")
                            if (request.data.get("type") != None):
                                item.type = request.data.get("type")
                            if (request.data.get("quantity") != None):
                                item.quantity = request.data.get("quantity")
                                if (item.quantity == 0):
                                    item.removed = datetime.now(datetime.dj_timezone.utc)
                            if (request.data.get("modification_reason") != None):
                                item.modification_reason = request.data.get("modification_reason")
                                if item.modification_reason == "item deleted":
                                    item.removed = datetime.now(timezone.utc)
                            if (request.data.get("state") != None):
                                item.state = request.data.get("state")
                            if (request.data.get("power") != None):
                                item.power = request.data.get("power")

                            item.save()

                            return Response({
                                "id": item.id,
                                "name": item.name,
                                "brand": item.brand,
                                "price": item.price,
                                "power": item.power,
                                "type": item.type,
                                "state": item.state,
                                "quantity": item.quantity,
                                "modification_reason": item.modification_reason,
                                "creation": item.creation,
                                "removed": item.removed,
                                "modification_date": item.modification_date
                            })
                        else:
                            raise AuthenticationFailed('Token has expired')
                    except Token.DoesNotExist:
                        raise AuthenticationFailed('Invalid token')
                else:
                    raise AuthenticationFailed('Authentication credentials were not provided')







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
