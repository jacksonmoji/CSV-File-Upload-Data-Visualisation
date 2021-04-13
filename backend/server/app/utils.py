from datetime import datetime
from app.models import Building, EnergyConsumption, Meter
import pandas as pd
import json

# prepare a collection of file model objects for bulk create


def data_clean_up(data):
    model_collection = []
    if set(['id', 'name']).issubset(data.columns):
        df = data['id']
        df_alpha_numeric = df.apply(pd.to_numeric, errors='coerce')
        df_numeric = df_alpha_numeric.dropna()
        model_collection = [Building(id=int(item), name=data['name'][count])
                            for count, item in enumerate(df_numeric)]

    elif set(['building_id', 'id', 'fuel', 'unit']).issubset(data.columns):
        df = data['id']
        df_alpha_numeric = df.apply(pd.to_numeric, errors='coerce')
        df_numeric = df_alpha_numeric.dropna()
        model_collection = [
            Meter(id=int(item),
                  fuel=data['fuel'][count],
                  unit=data['unit'][count],
                  building_id=Building.objects.get(id=int(data['building_id'][count])))
            for count, item in enumerate(df_numeric)]

    elif set(['consumption', 'reading_date_time', 'meter_id']).issubset(data.columns):

        model_collection = [
            EnergyConsumption(consumption=item,
                              reading_date_time=data['reading_date_time'][count],
                              meter_id=Meter.objects.get(id=data['meter_id'][count]))
            for count, item in enumerate(data['consumption'])]

    return model_collection

# get daily energy consumption for all hotels


def getDailyEnergyConsumption():
    stats = {}

    if EnergyConsumption.objects.all() and EnergyConsumption.objects.all():
        meters = pd.DataFrame(Meter.objects.all().values())
        energy = pd.DataFrame(EnergyConsumption.objects.all().values())

        meters.rename(columns={'id': 'meter_id'}, inplace=True)
        energy.rename(columns={'meter_id_id': 'meter_id'}, inplace=True)

        energy['reading_date_time'] = pd.to_datetime(
            energy['reading_date_time']).dt.date

        merged_meters_energy = pd.merge(meters, energy, on="meter_id")
        dates, daily_energy = merged_meters_energy[
            "reading_date_time"].drop_duplicates(), merged_meters_energy[[
                "reading_date_time", "consumption"]].groupby('reading_date_time').sum()

        stats = {"data": [{"date": date, "day": key + 1, "consumption": daily_energy.consumption[key]}
                 for key, date in enumerate(dates)], "message": "Statistics retrieved successfully"}
    else:
        stats = {"data": 0, "message": "No statistics"}

    return stats
