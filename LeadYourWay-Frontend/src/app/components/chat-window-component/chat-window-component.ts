import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mensajes } from '../../models/mensajes';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarioservice } from '../../services/usuarioservice';
import { ChatService } from '../../services/chatservice';

@Component({
  selector: 'app-chat-window-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window-component.html',
  styleUrl: './chat-window-component.css',
})
export class ChatWindowComponent {
   
}
