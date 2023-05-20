# Generated by Django 4.2.1 on 2023-05-19 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('station', '0002_stations_updnline'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tests',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('station_name', models.CharField(max_length=10)),
                ('updnLine', models.CharField(max_length=2)),
                ('heading_to', models.CharField(max_length=100)),
                ('arrival_time', models.IntegerField(blank=True, null=True)),
                ('subway_id', models.CharField(default='0000', max_length=4)),
            ],
            options={
                'db_table': 'tests',
            },
        ),
    ]