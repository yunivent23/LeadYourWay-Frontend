import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Users } from '../../models/users';
import { ChatService } from '../../services/chatservice';
import { Router } from '@angular/router';
import { Chats } from '../../models/chats';
import { Loginservice } from '../../services/loginservice';

@Component({
  selector: 'app-chat-list-component',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './chat-list-component.html',
  styleUrl: './chat-list-component.css',
})
export class ChatListComponent implements OnInit{
   // Variables de estado
  suministradores: Users[] = [];
  loading: boolean = true;
  error: string | null = null;
  
  // Variables de usuario logueado
  currentUserId: number = 0;
  currentUserRole: string = '';
  isCliente: boolean = false;

  constructor(
    private chatService: ChatService,
    private loginservice: Loginservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkUserRoleAndLoad();
  }

  /**
   * Verifica el rol del usuario logueado y carga la lista si es Cliente.
   */
  checkUserRoleAndLoad(): void {
    // NOTA: En la aplicación real, esta lógica debe ir en un AuthService
    // Simulamos la obtención del usuario y su rol.
    this.currentUserId = this.loginservice.showUserId();
    this.currentUserRole = this.loginservice.showRole();

    // Comprobamos si es un cliente
    this.isCliente = this.currentUserRole === 'CLIENTE';

    if (this.isCliente) {
      this.loadSuministradores();
    } else {
      this.loading = false;
      this.error = "Solo los clientes pueden iniciar nuevos chats con suministradores.";
    }
  }

  /**
   * Llama al servicio para obtener la lista de usuarios con rol 'SUMINISTRADOR'.
   */
  loadSuministradores(): void {
    this.loading = true;
    this.chatService.getSuministradores().subscribe({
      next: (data: Users[]) => {
        this.suministradores = data;
        this.loading = false;
        this.error = null;
      },
      error: (err) => {
        console.error('Error loading suppliers:', err);
        this.error = 'No se pudo cargar la lista de suministradores.';
        this.loading = false;
      }
    });
  }

  /**
   * Llama al backend para crear un nuevo registro de Chat y redirige a la ventana de chat.
   * @param suministradorId El ID del suministrador seleccionado.
   */
iniciarChat(suministradorId: number): void {
 if (this.currentUserId === 0) {
 // Esto solo se usa como fallback, la lógica principal de error está en checkUserRoleAndLoad()
 alert("Error: El ID del cliente no está disponible."); 
    return;
    }

    // ⚠️ LA LLAMADA AL SERVICE SOLO NECESITA EL ID DEL SUMINISTRADOR.
    // El ID del cliente (currentUserId) se obtiene dentro de chatservice.ts
   this.chatService.iniciarChat(suministradorId).subscribe({
   next: (nuevoChat: Chats) => {
    console.log('Chat creado con ID:', nuevoChat.idChat);
 
    // **REDIRECCIÓN CRÍTICA:** Navegar a la ventana del chat usando el ID del chat recién creado.
      this.router.navigate(['/nuevochat', nuevoChat.idChat]); // Corregido a /chats/:id
   },
    error: (err) => {
    console.error('Error al iniciar chat:', err);
    alert('Error al intentar crear el chat con el suministrador.'); 
    }
   });
 }

}
