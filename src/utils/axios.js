/**
 * axios setup to use mock service
 */

import axios from 'axios';

const axiosServices = axios.create();

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;

export const httpClient = axios.create({
    // produccion
    // baseURL: `http://localhost:3000/`,
    // dev
    baseURL: `http://localhost:3000/`,
    headers: {
        'Content-Type': 'application/json'
    }
});
