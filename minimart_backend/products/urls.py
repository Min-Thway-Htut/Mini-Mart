from django.urls import path
from .views import ProductList, ProductDetail, RegisterUserView, get_cart, add_to_cart, decrease_cart, remove_from_cart, clear_cart

urlpatterns = [
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    path('register/', RegisterUserView.as_view(), name="register"),
    path("cart/", get_cart),
    path("cart/add/", add_to_cart),
    path("cart/decrease/", decrease_cart),
    path("cart/remove/<int:product_id>/", remove_from_cart),
    path("cart/clear/", clear_cart)
]
