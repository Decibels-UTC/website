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

class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # Ne rien faire pour ignorer la v  rification CSRF




# Create your views here.


from rest_framework.exceptions import AuthenticationFailed

class ItemView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication,)
    def get(self, request):
        # Check if the request contains an Authorization header with a token
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header and auth_header.startswith('Token '):
            token_key = auth_header[6:]
            try:
                token = Token.objects.get(key=token_key)
                date1 = datetime.fromisoformat(str(token.created)[:19]) + timedelta(hours=1)
                date2 = datetime.fromisoformat(str(datetime.now())[:19])
                if date1 > date2:
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
        authentication_classes = (CsrfExemptSessionAuthentication,)
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header and auth_header.startswith('Token '):
            token_key = auth_header[6:] # Remove 'Token ' prefix
            try:
                token = Token.objects.get(key=token_key)
                date1 = datetime.fromisoformat(str(token.created)[:19]) + timedelta(hours=1)
                date2 = datetime.fromisoformat(str(datetime.now())[:19])
                if date1 > date2:
                    serializer = ItemSerializer(data=request.data)
                    if serializer.is_valid(raise_exception=True):
                        serializer.save()
                        return Response(serializer.data)
                else:
                    print("1")
                    raise AuthenticationFailed('Token has expired')
            except Token.DoesNotExist:
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
                        token = Token.objects.get(key=token_key)
                        date1 = datetime.fromisoformat(str(token.created)[:19]) + timedelta(hours=1)
                        date2 = datetime.fromisoformat(str(datetime.now())[:19])
                        if date1 > date2:
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
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def post(self, request, format=None):
        print(request.data)
        serializer = LoginSerializer(data=self.request.data, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        token.save()
        return Response({'token': token.key}, status=status.HTTP_200_OK)

class LogoutView(APIView):

    authentication_classes = (CsrfExemptSessionAuthentication,)
    def post(self, request, format=None):
        token = request.META.get('HTTP_AUTHORIZATION', '')[6:] # Retirez 'Token ' du d  b>
        try:
            token_obj = Token.objects.get(key=token)
            token_obj.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Token does not exist'}, status=401)

class VerifyTokenView(APIView):

    authentication_classes = (CsrfExemptSessionAuthentication,)
    def get(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', '')[6:] # Retirez 'Token ' du début
        try:
            token_obj = Token.objects.get(key=token)
            date1 = datetime.fromisoformat(str(token_obj.created)[:19]) + timedelta(hours=1)
            date2 = datetime.fromisoformat(str(datetime.now())[:19])
            if date1 > date2 :
               return Response({'Session valide': "valide"}, status=200)
            else:
                 print("expire")
                 token_obj.delete()
                 return Response({'error': 'Token expired'}, status=401)
        except Token.DoesNotExist:
            return Response({'error': 'Token does not exist'}, status=401)
