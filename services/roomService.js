import ApiService from './apiService'; // Importa el servicio base que maneja las peticiones
import AsyncStorage from '@react-native-async-storage/async-storage';

class RoomService {

  // Método para obtener encabezados, incluyendo el país si es necesario
  async getHeaders() {
    let headers = {};
    const country = await AsyncStorage.getItem('country'); // Obtener país del almacenamiento
    if (country) {
      headers['country'] = country;
    }
    return headers;
  }

  // Método para obtener habitaciones por hotel
  async getRoomsByHotelId(id) {
    console.log("hotelId entrando....",id);
    const headers = await this.getHeaders();
    return ApiService.get(`api/room/getRoom/${id}`);
  }

  // Método para actualizar una habitación
  async updateRoom(roomData) {
    const headers = await this.getHeaders();
    return ApiService.post('api/rooms/update', roomData, headers);
  }

  // Método para cerrar una habitación
  async closeRoom(roomData) {
    const headers = await this.getHeaders();
    return ApiService.post('api/rooms/close', roomData, headers);
  }

  // Método para cerrar un hotel completo
  async closeHotel(hotelId, agent_uuid) {
    const headers = await this.getHeaders();
    return ApiService.post('api/rooms/closeHotel', { hotelId, agent_uuid }, headers);
  }

  // Método para encontrar habitaciones cerradas por el ID de hotel
  async findClosedRoom(hotelId) {
    const headers = await this.getHeaders();
    return ApiService.get(`api/rooms/closed/${hotelId}`, headers);
  }

  // Método para obtener eventos de calendario
  async getEventsCalendar(hotelId, fromDate, toDate) {
    const headers = await this.getHeaders();
    return ApiService.post('api/rooms/eventsCalendar', { hotelId, from: fromDate, to: toDate }, headers);
  }

  // Método para eliminar un evento de habitación
  async deleteRoomEvent(hash) {
    const headers = await this.getHeaders();
    return ApiService.delete(`api/rooms/event/${hash}`, headers);
  }
}

export default new RoomService();
