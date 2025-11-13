// src/services/apiBebidas.ts
import axios, { type AxiosInstance } from 'axios';

const apiBebidas: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Puerto del backend de FastAPI
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiBebidas;
