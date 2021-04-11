import dateutil.parser
import pandas as pd
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response

from app.models import Building, EnergyConsumption, Meter
from app.serializers import (BuildingSerializer, EnergyConsumptionSerializer,
                             MeterSerializer)
from app.utils import data_clean_up, getDailyEnergyConsumption


class BuildingList(generics.ListCreateAPIView):
    parser_classes = [MultiPartParser, FormParser]

    queryset = Building.objects.all()
    serializer_class = BuildingSerializer

    def post(self, request, *args, **kwargs):
        file_obj = request.data['file']
        data = pd.read_csv(file_obj)
        records = data_clean_up(data)

        # insert prepared Model Object Collection to the database
        Building.objects.bulk_create(
            records, batch_size=999, ignore_conflicts=True)

        return Response(file_obj, status=204)


class EnergyConsumptionList(generics.ListCreateAPIView):
    queryset = EnergyConsumption.objects.all()
    serializer_class = EnergyConsumptionSerializer

    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        file_obj = request.data['file']
        data = pd.read_csv(file_obj)
        records = data_clean_up(data)

        # insert prepared Model Object Collection to the database
        EnergyConsumption.objects.bulk_create(
            records, batch_size=999, ignore_conflicts=True)

        return Response(file_obj, status=204)


class MeterList(generics.ListCreateAPIView):
    queryset = Meter.objects.all()
    serializer_class = MeterSerializer

    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        file_obj = request.data['file']
        data = pd.read_csv(file_obj)
        records = data_clean_up(data)

        # insert prepared Model Object Collection to the database
        Meter.objects.bulk_create(
            records, batch_size=999, ignore_conflicts=True)

        return Response(file_obj, status=204)


@api_view(['GET'])
def energy_consumption_list(request):

    if request.method == 'GET':
        energy_consumption_stats = getDailyEnergyConsumption()

        return Response(energy_consumption_stats)
