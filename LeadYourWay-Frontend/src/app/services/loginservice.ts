import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequestDTO } from '../models/jwtRequestDTO';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class Loginservice {
  constructor(private http: HttpClient) {}
  login(request: JwtRequestDTO) {
    return this.http.post('http://localhost:8080/login', request);
  }
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }

  showUserId(): number {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return 0;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    if (!decodedToken) {
      console.warn('Loginservice: El token no pudo ser decodificado. Token inválido.');
      return 0;
    }
    const payload = decodedToken;
    let userIdValue: any = null;
    let userIdKey: string = '';

    // Lista ampliada de posibles nombres de campo para el ID de usuario
    const possibleKeys = ['idusuario', 'userId', 'id', 'sub', 'user_id', 'id_user', 'ID', 'uid'];

    // Buscar el primer campo que exista en el payload
    for (const key of possibleKeys) {
      if (payload[key] !== undefined && payload[key] !== null) {
        userIdValue = payload[key];
        userIdKey = key;
        break;
      }
    }

    if (userIdValue === null) {
      console.warn(
        'Loginservice: No se encontró ningún campo de ID de usuario conocido en el token JWT decodificado.'
      );
      return 0;
    }

    // Convertir a número y validar
    const numericId = Number(userIdValue);

    if (isNaN(numericId) || numericId <= 0) {
      console.error(
        `Loginservice: El valor encontrado para el ID ('${userIdKey}': ${userIdValue}) no es un número válido (> 0).`
      );
      return 0;
    }

    console.log(
      `Loginservice: ID de usuario obtenido correctamente del campo '${userIdKey}':`,
      numericId
    );
    return numericId;
  }

  getUsername(): string | null {
    const token = sessionStorage.getItem('token');
    if (!token) return null;

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.sub || decodedToken?.username || null;
    // Dependiendo de cómo tu backend genere el JWT, el username
    // puede estar en 'sub' o 'username'
  }
}
