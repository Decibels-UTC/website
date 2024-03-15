import uuid
import pytz
from django.utils import timezone as dj_timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import AuthToken
from django.shortcuts import render
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from . models import *
from django.shortcuts import get_object_or_404
from . serializer import *
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User, update_last_login
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import api_view, permission_classes

session_time = 3 # amount of hours 

class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # Ne rien faire pour ignorer la v  rification CSRF


class LoginView(APIView):
    serializer_class = LoginSerializer
    authentication_classes = (CsrfExemptSessionAuthentication,)


    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        # Generate a new unique token
        token_value = str(uuid.uuid4())
        # Create a new AuthToken instance with the generated token
        token = AuthToken.objects.create(user=user, token=token_value)
        return Response({'token': token.token, 'username':user.username, 'id':user.id, 'is_staff':user.is_staff, 'is_superuser': user.is_superuser}, status=status.HTTP_200_OK)
    
class VerifyTokenView(APIView):

    authentication_classes = (CsrfExemptSessionAuthentication,)

    def get(self, request):
        token_header = request.META.get('HTTP_AUTHORIZATION', '')
        if not token_header.startswith('Token '):
            return Response({'error': 'Invalid token header format'}, status=status.HTTP_401_UNAUTHORIZED)

        token_value = token_header[6:]  
        try:
            token_obj = AuthToken.objects.get(token=token_value)
            # Check if the token has expired
            if token_obj.created + timedelta(hours=session_time) > dj_timezone.now():
                return Response({'Session valid': "valide"}, status=status.HTTP_200_OK)
            else:
                token_obj.delete()
                return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except AuthToken.DoesNotExist:
            return Response({'error': 'Token does not exist'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def post(self, request):
        token_header = request.META.get('HTTP_AUTHORIZATION', '')
        if not token_header.startswith('Token '):
            return Response({'detail': 'Invalid token header format.'}, status=status.HTTP_400_BAD_REQUEST)

        token_value = token_header[6:]  
        print(f"Attempting to delete token: {token_value}")

        try:
            deleted_count, _ = AuthToken.objects.filter(token=token_value).delete()
            if deleted_count ==  0:
                return Response({'detail': 'Token not found.'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error deleting token: {e}")
            return Response({'detail': 'An error occurred while trying to delete the token.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication,)
    def get(self, request):
            token_header = request.META.get('HTTP_AUTHORIZATION', '')
            if not token_header.startswith('Token '):
                return Response({'error': 'Invalid token header format'}, status=status.HTTP_401_UNAUTHORIZED)

            token_value = token_header[6:]  
            try:
                token_obj = AuthToken.objects.get(token=token_value)
                if token_obj.created + timedelta(hours=session_time) > dj_timezone.now():
                    user = User.objects.get(id=token_obj.user_id)
                    return Response({'username':user.username, 'id':user.id, 'is_staff':user.is_staff, 'is_superuser': user.is_superuser}, status=status.HTTP_200_OK)
                else:
                    token_obj.delete()
                    return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
            except AuthToken.DoesNotExist:
                return Response({'error': 'Token does not exist'}, status=status.HTTP_401_UNAUTHORIZED)

class ItemView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication,)
    """ def get(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header and auth_header.startswith('Token '):
            token_key = auth_header[6:]
            try:
                token = AuthToken.objects.get(token=token_key)

                if token.created + timedelta(hours=session_time) > dj_timezone.now():
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
                            "description" : item.description,
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
            except AuthToken.DoesNotExist:
                raise AuthenticationFailed('Invalid token')
        else:
             raise AuthenticationFailed('Authentication credentials were not provided')"""
        
    def get(self, request):
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
                            "description" : item.description,
                            "modification_reason": item.modification_reason,
                            "creation": item.creation,
                            "removed": item.removed,
                            "modification_date": item.modification_date,
                        }
                        for item in Item.objects.all()
                    ]
            return Response(output)
                

    def post(self, request):
        authentication_classes = (CsrfExemptSessionAuthentication,)
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header and auth_header.startswith('Token '):
            token_key = auth_header[6:] 
            try:
                token = AuthToken.objects.get(token=token_key)
                user = User.objects.get(id=token.user_id)
                if user.id == 2: 
                    return Response({'response' :'unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

                if token.created + timedelta(hours=session_time) > dj_timezone.now():
                    serializer = ItemSerializer(data=request.data)
                    if serializer.is_valid(raise_exception=True):
                        serializer.save()
                        history = HistorySerializer(data={'user':user.username, 'action':f"A ajouté un item : {request.data.get('name')}"})
                        history.is_valid(raise_exception=True)
                        history.save()
                        return Response(serializer.data)
                else:
                    print("1")
                    raise AuthenticationFailed('Token has expired')
            except AuthToken.DoesNotExist:
                print("2")
                raise AuthenticationFailed('Invalid token')
        else:
            print("3")
            raise AuthenticationFailed('Authentication credentials were not provided')

    def put(self, request, pk):
                auth_header = request.META.get('HTTP_AUTHORIZATION')
                if auth_header and auth_header.startswith('Token '):
                    token_key = auth_header[6:]
                    try:
                        token = AuthToken.objects.get(token=token_key)
                        user = User.objects.get(id=token.user_id)
                        if user.id == 2: 
                            return Response({'response' :'unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

                        if token.created + timedelta(hours=session_time) > dj_timezone.now():
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
                            if (request.data.get("description") != None):
                                item.description = request.data.get("description")                                
                            if (request.data.get("quantity") != None):
                                item.quantity = int(request.data.get("quantity"))
                                if item.quantity == 0:
                                    item.removed = datetime.now(pytz.UTC)
                            if (request.data.get("modification_reason") != None):
                                item.modification_reason = request.data.get("modification_reason")
                                if item.modification_reason == "item deleted" or item.quantity == 0:
                                    item.removed = datetime.now(pytz.UTC)
                                    history = HistorySerializer(
                                        data={'user': user.username,
                                              'action': f"A supprimé un item : {request.data.get('name')}"})
                                    history.is_valid(raise_exception=True)
                                    history.save()
                                else:
                                    history = HistorySerializer(
                                        data={'user': user.username,
                                              'action': f"A modifié un item : {request.data.get('name')}"})
                                    history.is_valid(raise_exception=True)
                                    history.save()
                            else:
                                if item.quantity != 0:
                                    history = HistorySerializer(data={'user': user.username,
                                                                    'action': f"A modifié un item : {request.data.get('name')}"})
                                    history.is_valid(raise_exception=True)
                                    history.save()
                                else:
                                    history = HistorySerializer(
                                        data={'user': user.username,
                                              'action': f"A supprimé un item : {request.data.get('name')}"})
                                    history.is_valid(raise_exception=True)
                                    history.save()

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
                                "description" :item.description,
                                "state": item.state,
                                "quantity": item.quantity,
                                "modification_reason": item.modification_reason,
                                "creation": item.creation,
                                "removed": item.removed,
                                "modification_date": item.modification_date
                            })
                        else:
                            raise AuthenticationFailed('Token has expired')
                    except AuthToken.DoesNotExist:
                        raise AuthenticationFailed('Invalid token')
                else:
                    raise AuthenticationFailed('Authentication credentials were not provided')

class HistoryView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication,)
    def get(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header and auth_header.startswith('Token '):
            token_key = auth_header[6:]
            try:
                token = AuthToken.objects.get(token=token_key)

                if token.created + timedelta(hours=session_time) > dj_timezone.now():
                    output = [
                        {
                            "action": item.action,
                            "user": item.user,
                            "date": item.date,
                        }
                        for item in History.objects.all()
                    ]
                    return Response(output)
                else:
                    raise AuthenticationFailed('Token has expired')
            except AuthToken.DoesNotExist:
                raise AuthenticationFailed('Invalid token')
        else:
            raise AuthenticationFailed('Authentication credentials were not provided')
