from django.shortcuts import render
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from django.contrib.auth.models import User
from rest_framework import serializers, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CartItem
from products.models import Product
from .serializers import CartItemSerializer

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data["email"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
    
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_cart(request):
    items = CartItem.objects.filter(user=request.user)
    serializer = CartItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get("product_id")

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    item, created = CartItem.objects.get_or_create(
        user=request.user, product=product
    )

    if not created:
        item.quantity += 1
        item.save()

    return Response({"message": "Added to cart"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def decrease_cart(request):
    product_id = request.data.get("product_id")

    try:
        item = CartItem.objects.get(user=request.user, product_id=product_id)
    except CartItem.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    if item.quantity > 1:
        item.quantity -= 1
        item.save()
    else:
        item.delete()

    return Response({"message": "Updated"})


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, product_id):
    CartItem.objects.filter(user=request.user, product_id=product_id).delete()
    return Response({"message": "Removed"})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    CartItem.objects.filter(user=request.user).delete()
    return Response({"detail": "Cart cleared"})