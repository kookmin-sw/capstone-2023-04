# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Stations(models.Model):
    station_name = models.CharField(max_length=10)
    heading_to = models.CharField(max_length=100, blank=True, null=True)
    arrival_time = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.station_name

    class Meta:
        managed = False
        verbose_name = 'Stations'
        verbose_name_plural = 'Stations'
        app_label = 'station'
        db_table = 'stations'


class Times(models.Model):
    request_time = models.TimeField()

    def __str__(self):
        return str(self.request_time)
    
    class Meta:
        managed = False
        verbose_name = 'Times'
        verbose_name_plural = 'Times'
        app_label = 'station'
        db_table = 'times'
