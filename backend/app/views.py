from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from django.shortcuts import get_object_or_404
from . serializer import *
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timezone



# Create your views here.


class ItemView(APIView):
    def get(self, request):
        output = [
            {"id":output.id,
            "name" : output.name,
            "brand" : output.brand,
            "price" : output.price,
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

        item.save()

        return Response({
            "id":item.id,
            "name" : item.name,
            "brand" : item.brand,
            "price" : item.price,
            "type": item.type,
            "state": item.state,
            "quantity" : item.quantity,
            "modification_reason" : item.modification_reason,
            "creation" : item.creation,
            "removed" : item.removed,
            "modification_date" : item.modification_date}
            )
