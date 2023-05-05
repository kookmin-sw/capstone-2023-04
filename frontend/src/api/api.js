import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default API;