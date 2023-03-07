from django.db import models

class Stationinfo(models.Model):
    name = models.CharField(max_length=10)
    count = models.IntegerField()
    
    def __str__(self):
        return self.name

    class Meta:
        managed = False
        app_label = "station"
        db_table = 'stationInfo'