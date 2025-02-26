import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiService {
  constructor() {
    this.apiBackEnd = 'http://192.168.1.44:3000/'; 
    this.http = axios.create({
      baseURL: this.apiBackEnd,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptar las solicitudes para agregar el token a los encabezados
    this.http.interceptors.request.use(
      async (config) => {
        const token = await this.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Método para obtener el token almacenado
  async getToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Error al obtener el token:', error);
      return null;
    }
  }

  // Método genérico para realizar una solicitud POST
  post(url, data) {
    return this.http
      .post(url, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        return Promise.reject(error);
      });
  }

  // Método genérico para realizar una solicitud GET
  get(url) {
    return this.http
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        return Promise.reject(error);
      });
  }
}

export default new ApiService();
