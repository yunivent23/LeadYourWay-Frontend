import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Users } from "../models/users";
import { Observable } from "rxjs";
import { Chats } from "../models/chats";
import { Mensajes } from "../models/mensajes";
import { Loginservice } from "./loginservice";

@Injectable({
  providedIn: 'root',
})
export class ChatService {
     // Asegúrate de usar la URL base de tu API (ej: localhost:8080)
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient, private loginService:Loginservice) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Incluir el token JWT
    });
  }

  // 1. OBTENER LISTA DE SUMINISTRADORES (Asumiendo que tu backend tiene esta ruta pública o privada)
  getSuministradores(): Observable<Users[]> {
    // Esta ruta debe ser implementada en tu backend para devolver solo los usuarios con rol 'SUMINISTRADOR'
    return this.http.get<Users[]>(`${this.apiUrl}/usuarios`, { headers: this.getAuthHeaders() });
  }

  // 2. INICIAR UN CHAT (POST)
  // Crea un nuevo registro en la tabla 'Chats'
  iniciarChat(suministradorId: number): Observable<Chats> {
    
    // 1. Obtener el ID del cliente logueado desde el token
    //const clienteId = this.loginService.showUserId(); 
    
    if (suministradorId === 0) {
        throw new Error("ID de usuario no disponible para iniciar chat.");
    }
    
    // 2. CONSTRUIR EL OBJETO EXACTO que el backend espera (usuario anidado)
    const chatData = {
      // ⚠️ El backend espera un objeto "usuario" con un "id" para la relación
      usuario: {
        id: suministradorId 
      }
      // Nota: Si tu backend requiere también el ID del suministrador,
      // la estructura sería diferente (ej: cliente: {id: clienteId}, suministrador: {id: suministradorId}).
      // Por ahora, solo enviamos el cliente ID que debe ir al campo 'usuario' de la entidad Chats.
    };
    
    // 3. Llamada HTTP
    return this.http.post<Chats>(
        `${this.apiUrl}/Chats/insertar`, 
        chatData, 
        { headers: this.getAuthHeaders() }
    );
  }
  // 3. OBTENER MENSAJES DE UN CHAT ESPECÍFICO
  getMensajesByChat(chatId: number): Observable<Mensajes[]> {
    // Esta ruta debe ser implementada en tu backend para filtrar mensajes por chat ID
    return this.http.get<Mensajes[]>(`${this.apiUrl}/Mensajes/Chat/${chatId}`, { headers: this.getAuthHeaders() });
  }

  // 4. ENVIAR UN MENSAJE (POST)
  enviarMensaje(chatId: number, emisorId: number, contenido: string): Observable<Mensajes> {
    const mensajeData = {
      contenido: contenido,
      emisor: { id: emisorId }, // Asumimos que el backend necesita el objeto emisor
      chats: { idChat: chatId } // Asumimos que el backend necesita el objeto chat
      // fechaEnvio y leido se pueden generar en el backend
    }
    // Asegúrate de que la ruta en tu backend sea algo como /Mensajes/Insertar
    return this.http.post<Mensajes>(`${this.apiUrl}/Mensajes/Insertar`, mensajeData, { headers: this.getAuthHeaders() });
  }
}