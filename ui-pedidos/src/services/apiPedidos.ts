// apiPedidos.ts
import axios, { type AxiosInstance } from 'axios';

const apiPedidos: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8081', // Spring Boot
  headers: { 'Content-Type': 'application/json' },
});

export default apiPedidos;
