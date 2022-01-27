import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/challenge-37a80/us-central1/api' // THE API URL (CLOUD FUNTION)
});

export default instance;