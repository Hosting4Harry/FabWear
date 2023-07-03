
import { useEffect } from 'react';
import axios from 'axios';

let instance = axios.create({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

const useAuth = () => {
    useEffect(() => {
        let reqInterceptor = instance.interceptors.request.use(config => {
            const token = localStorage.getItem('Ecomtoken');
            if (token) {
                config.headers['x-access-token'] = token;
            }
            return config;
        });

        let resInterceptor = instance.interceptors.response.use(
            response => response,
            error => {
                // Handle response error
                return Promise.reject(error);
            }
        );

        return () => {
            instance.interceptors.request.eject(reqInterceptor);
            instance.interceptors.response.eject(resInterceptor);
        };
    }, []);

    return instance;
};

export default useAuth;
