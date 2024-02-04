from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from . serializer import *
from rest_framework.response import Response

# Create your views here.


class ItemView(APIView):
    def get(self, request):
        output = [
            {"id":output.id,
            "name" : output.name,
            "brand" : output.brand,
            "price" : output.price,
            "quantity" : output.quantity,
            "modification_reason" : output.modification_reason,
            "creation" : output.creation,
            "removed" : output.removed,
            "modification_date" : output.modification_date}
        for output in Item.objects.all()
        ]

        return Response(output)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def update(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
