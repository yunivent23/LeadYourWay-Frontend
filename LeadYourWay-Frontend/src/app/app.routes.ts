import { Routes } from '@angular/router';
import { Usuariocomponent } from './components/usuariocomponent/usuariocomponent';
import { Usuarioinsertar } from './components/usuariocomponent/usuarioinsertar/usuarioinsertar';
import { Usuariobuscar } from './components/usuariocomponent/usuariobuscar/usuariobuscar';
import { Bicicletacomponent } from './components/bicicletacomponent/bicicletacomponent';
import { Bicicletabuscar } from './components/bicicletacomponent/bicicletabuscar/bicicletabuscar';
import { Bicicletainsertar } from './components/bicicletacomponent/bicicletainsertar/bicicletainsertar';
import { Landing } from './components/landing/landing';
import { Autenticator } from './components/autenticator/autenticator';
import { seguridadGuard } from '../guard/seguridad-guard';
import { ChatListComponent } from './components/chat-list-component/chat-list-component';
import { ChatWindowComponent } from './components/chat-window-component/chat-window-component';
import { Pago } from './components/pago/pago';
import { Alquilercomponent } from './components/alquilercomponent/alquilercomponent';
import { Alquilerinsert } from './components/alquilercomponent/alquilerinsert/alquilerinsert';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Autenticator,
  },

  {
    path: 'users',
    component: Usuariocomponent,
    children: [
      { path: 'news', component: Usuarioinsertar },
      { path: 'edits/:id', component: Usuarioinsertar },
      { path: 'searchs', component: Usuariobuscar },
    ],
        canActivate: [seguridadGuard],

  },
  {
    path: 'bicicleta',
    component: Bicicletacomponent,
    children: [
      { path: 'news', component: Bicicletainsertar },
      { path: 'edits/:id', component: Bicicletainsertar },
      { path: 'searchs', component: Bicicletabuscar },
    ],
        canActivate: [seguridadGuard],

  },

  {
    path: 'landing', // La URL que se usará para navegar
    component: Landing, // El componente a mostrar
    canActivate: [seguridadGuard],
  },

  {
    path: 'chats', // La URL que se usará para navegar
    component: ChatListComponent, // El componente a mostrar
  },
  {
    path: 'nuevochat/:id',
    component: ChatWindowComponent,
  },
  {
    path: 'pago',
    component: Pago,
  },
  {
    path: 'alquileres',
    component: Alquilercomponent,
    children: [
      { path: 'news', component: Alquilerinsert },
      { path: 'edits/:id', component: Alquilerinsert },
    ],
    canActivate: [seguridadGuard],
  },
];
