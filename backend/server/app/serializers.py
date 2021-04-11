from rest_framework import serializers
from .models import Building, EnergyConsumption, Meter


class EnergyConsumptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnergyConsumption
        fields = ("consumption", "reading_date_time", "meter_id")


class MeterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meter
        fields = ("id", "fuel", "unit")


class BuildingSerializer(serializers.ModelSerializer):
    meters = MeterSerializer(many=True, read_only=True)

    class Meta:
        model = Building
        fields = ('name', 'meters')
