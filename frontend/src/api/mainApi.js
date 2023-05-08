import API from './api';

export default {
    getSavedTime() {
        return API.get('/station/time');
    },
    getStationInfo() {
        return API.get('/station/station');
    },
    getStationList() {
        return API.get('/station/list');
    },
};