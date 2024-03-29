from django.db import models

class Times(models.Model):
    request_time = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.request_time)
    class Meta:
        verbose_name = 'Times'
        verbose_name_plural = 'Times'
        app_label = 'station'
        db_table = 'times'


class Stations(models.Model):
    station_name = models.CharField(max_length=10)
    updnLine = models.CharField(max_length=2)
    heading_to = models.CharField(max_length=100)
    arrival_time = models.IntegerField(blank=True, null=True)
    subway_id = models.CharField(max_length=4, default='0000')
    
    def __str__(self):
        return self.station_name

    class Meta:
        verbose_name = 'Stations'
        verbose_name_plural = 'Stations'
        app_label = 'station'
        db_table = 'stations'
        
class Tests(models.Model):
    station_name = models.CharField(max_length=10)
    updnLine = models.CharField(max_length=2)
    heading_to = models.CharField(max_length=100)
    arrival_time = models.IntegerField(blank=True, null=True)
    subway_id = models.CharField(max_length=4, default='0000')
    
    class Meta:
        db_table = 'tests'