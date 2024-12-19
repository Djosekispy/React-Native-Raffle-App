import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.103:3000',
});

const apiAmin = axios.create({
    baseURL: 'http://192.168.1.103:3000/admin',
});


export { api , apiAmin};
