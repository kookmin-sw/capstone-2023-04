class MultiDBRouter(object):
    def __init__(self):
        self.model_list = ['default', 'station_db']

    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'station':
            return 'station_db'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'station':
            return 'station_db'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'station' or \
                obj2._meta.app_label == 'station':
            return True

        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'station':
            return db == 'station_db'
        
        return None