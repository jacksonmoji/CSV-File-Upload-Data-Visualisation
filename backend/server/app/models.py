from django.db import models


class Building(models.Model):
    '''
    The Building object.

    Attributes:
        id: The id of the building,
        name: The string with building name,
    '''

    id = models.PositiveSmallIntegerField(primary_key=True)
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Meter(models.Model):
    '''
    The Meter represent the fuel, energy measuring unit.

    Attributes:
        id: The identification number of meter
        fuel: source of energy
        unit: energy measuring unit
        building_id : The reference to corresponding building
    '''

    id = models.PositiveSmallIntegerField(primary_key=True)
    fuel = models.CharField(max_length=20)
    unit = models.CharField(max_length=20)
    building_id = models.ForeignKey(
        Building, on_delete=models.CASCADE, related_name='meters')


class EnergyConsumption (models.Model):
    '''
    The EnergyConsumption represent the building's half hourly consumption object.

    Attributes:
        consumption: energy used
        reading_date_time: The date captured after half hourly energy consuption
        meter_id: The reference to corresponding meter
    '''

    consumption = models.FloatField(max_length=15)
    reading_date_time = models.DateTimeField(blank=True)
    meter_id = models.ForeignKey(
        Meter, on_delete=models.CASCADE, related_name='energy_consumptions')

    def __float__(self):
        return self.consumption
