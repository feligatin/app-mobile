import ApiService from './apiService'; // Importa el servicio base
import AsyncStorage from '@react-native-async-storage/async-storage';

class CatalogService {

  // Método para obtener encabezados, incluyendo el país si es necesario
  async getHeaders() {
    let headers = {};
    const country = await AsyncStorage.getItem('country'); // Obtener país del almacenamiento
    if (country) {
      headers['country'] = country;
    }
    return headers;
  }

  // Método para obtener todas las ciudades
  async findAllCities() {
    const headers = await this.getHeaders();
    return ApiService.get('api/catalog/cities', headers);
  }

  // Método para obtener todos los servicios de catering
  async findAllCatering() {
    const headers = await this.getHeaders();
    return ApiService.get('api/catalog/catering', headers);
  }

  // Método para obtener catálogos por tipo
  async findCatalogByType(type) {
    const headers = await this.getHeaders();
    return ApiService.get(`api/catalog/${type}`, headers);
  }

  // Método para obtener catálogos por ID y tipo
  async findCatalogByTypeId(id, type) {
    const headers = await this.getHeaders();
    return ApiService.get(`api/catalog/${type}/${id}`, headers);
  }

  // Método para obtener tipos de catálogos
  async getTypes() {
    return ApiService.get('api/catalog/types');
  }

  // Método para obtener todos los catálogos
  async findAll() {
    return ApiService.get('api/catalog/all');
  }

  // Método para crear un catálogo
  async createCatalog(catalogData) {
    const headers = await this.getHeaders();
    return ApiService.post('api/catalog/create', catalogData, headers);
  }

  // Método para actualizar un catálogo
  async updateCatalog(id, catalogData) {
    const headers = await this.getHeaders();
    return ApiService.post('api/catalog/update', { id, ...catalogData }, headers);
  }
}

export default new CatalogService();
