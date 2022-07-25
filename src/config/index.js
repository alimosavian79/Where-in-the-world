import axios from 'axios';

const baseURL = "https://restcountries.com/v2/"

const Api = axios.create({
    baseURL: baseURL
});

export { Api };

