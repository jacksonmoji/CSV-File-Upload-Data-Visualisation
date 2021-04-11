from django.urls import path
from app.views import BuildingList, EnergyConsumptionList, MeterList, energy_consumption_list

urlpatterns = [
    path('buildings', BuildingList.as_view(), name='building_view'),
    path('energy_consumptions', EnergyConsumptionList.as_view(),
         name='energy_consumption_view'),
    path('meters', MeterList.as_view(), name='meter_view'),
    path('energy_consumptions_stats', energy_consumption_list,
         name='energy_consumptions_stats_view')
]
