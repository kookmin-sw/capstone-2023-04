from django.db import models

class Stationinfo(models.Model):
    name = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        app_label = "station"
        db_table = 'stationInfo'