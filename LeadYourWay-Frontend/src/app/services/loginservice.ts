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
    
    // **LÍNEA CRÍTICA:** Buscamos el ID con los nombres más comunes que el backend usa.
    // Usaremos un orden de prioridad: 1. idusuario, 2. userId, 3. id.
    
    // Asignamos la variable decodificada a una constante para simplificar
    const payload = decodedToken;
    let userId: any;

    if (payload.idusuario) { // Usamos idusuario si existe (común en Java/DTOs)
        userId = payload.idusuario;
    } else if (payload.userId) { // Opción común en frameworks
        userId = payload.userId;
    } else if (payload.id) { // Opción más genérica
        userId = payload.id;
    } else if (payload.sub) { // 'sub' (subject) a veces contiene el ID si no hay un campo específico
        // Si 'sub' es el ID numérico, lo usamos.
        userId = payload.sub;
    } else {
        // Si no se encuentra, userId es undefined.
        return 0;
    }
    
    // Convertir a número y devolver. Si el ID no es un número válido (ej. es un string de email), esto falla.
    // Asumiremos que el backend envía un ID numérico.
    return userId ? +userId : 0; 
  }
  
  

}