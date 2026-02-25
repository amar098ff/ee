import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
});

// Add a request interceptor to include the auth token in headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
