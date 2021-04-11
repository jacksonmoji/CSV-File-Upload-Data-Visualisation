"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
#from rest_framework.routers import SimpleRouter
#from app.views import BuildingList, EnergyConsumptionList, MeterList
#from app.urls import urlpatterns as api_urlpatterns


# create and register routers for the view sets
'''router = routers.SimpleRouter()
router.register(r"buildings", BuildingList)
router.register(r"energyconsumption", EnergyConsumptionList)
router.register(r"meter", MeterList)
'''

# add in all other request patterns
urlpatterns = [
    path('api/v1/', include('app.urls'))
]
