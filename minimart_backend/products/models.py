from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Food', 'Food'),
        ('Drinks', 'Drinks'),
        ('Snacks', 'Snacks'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    price = models.FloatField()
    description = models.TextField()
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return self.name