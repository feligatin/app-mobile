import ApiService from './apiService'; // Importa el servicio base
import AsyncStorage from '@react-native-async-storage/async-storage';

class HotelService {

  // Método para obtener el país (ejemplo de cómo manejar la lógica de encabezados)
  async getHeaders() {
    let headers = {};
    const country = await AsyncStorage.getItem('country'); // Obtener país del almacenamiento si es necesario
    if (country) {
      headers['country'] = country;
    }
    return headers;
  }

  // Método para obtener hoteles
  async getHotels(city, from, to, rooms, people, companyId) {
    console.log("entra");
    const headers = await this.getHeaders();
    console.log("headerss",headers);
    return ApiService.post('api/hotel/check', {
      city,
      from,
      to,
      rooms,
      people,
      companyId,
    }, headers);
  }

  // Método para obtener hotel por ID
  async getHotelById(id) {
    return ApiService.get(`api/hotel/get/hotel/${id}`);
  }

  // Método para obtener hotel por algún ID (Ejemplo)
  async getHotelByIdSome(id) {
    return ApiService.get(`api/hotel/get/hotelSome/${id}`);
  }

  // Método para obtener tipos de servicios de habitaciones
  async getRoomTypeServices(id) {
    return ApiService.get(`api/hotel/get/roomTypeServices/${id}`);
  }

  // Método para encontrar hotel por RUC
  async findHotelByRuc(paymentRuc, tradename, cityCatalog) {
    const headers = await this.getHeaders();
    return ApiService.post('api/hotel/checkRuc/', {
      paymentRuc,
      tradename,
      cityCatalog,
    }, headers);
  }

  // Método para encontrar todos los hoteles
  async findAll() {
    return ApiService.get('api/hotel/get/all');
  }

  // Método para autocompletar búsquedas de hoteles
  async autocomplete(search) {
    return ApiService.post('api/hotel/autocomplete/', { search });
  }

  // Método para crear un hotel (simplificado)
  async createHotel(hotelData) {
    const headers = await this.getHeaders();
    return ApiService.post('api/hotel/create', hotelData, headers);
  }

  // Método para actualizar un hotel (simplificado)
  async updateHotel(id, hotelData) {
    const headers = await this.getHeaders();
    return ApiService.post('api/hotel/update', { id, ...hotelData }, headers);
  }
}

export default new HotelService();
