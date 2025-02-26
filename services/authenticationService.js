import ApiService from './apiService'; // Importa el servicio base

class AuthenticationService {
  // Método para iniciar sesión
  login(username, password) {
    return ApiService.post('api/auth/login', { username, password });
  }

  // Método para cambiar la empresa
  changeCompany(id, client, email, username, comesFrom) {
    return ApiService.post('api/auth/changecompany', { id, client, email, username, comesFrom });
  }

  // Método para solicitar cambio de contraseña
  forgot(email) {
    return ApiService.post('api/auth/forgot', { email });
  }

  // Método para validar la URL de recuperación
  validateUrl(encrypt) {
    return ApiService.post('api/auth/url-validation', { encrypt });
  }

  // Método para la recuperación de contraseña
  recovery(encrypt, password) {
    return ApiService.post('api/auth/recovery', { encrypt, password });
  }

  // Método para cambiar la contraseña
  change(password, username) {
    return ApiService.post('api/auth/change', { password, username });
  }
}

export default new AuthenticationService();
