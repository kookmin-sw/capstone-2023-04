import API from './api';

export default {
    getSavedTime() {
        return API.get('/station/time');
    },
    getStation() {
        return API.get('/station/station');
    },
};