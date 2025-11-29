import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Loginservice } from '../../services/loginservice';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule,MatToolbarModule,MatMenuModule,MatButtonModule,RouterLink, MatDividerModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
    role: string = '';
  usuario: string = '';

  constructor(private loginService: Loginservice) {}

    cerrar() {
    sessionStorage.clear();
  }
  
 
  verificar() {
    this.role = this.loginService.showRole();

    return this.loginService.verificar();
  }
  isSumi() {
    return this.role === 'SUMINISTRADOR';
  }

  isClient() {
    return this.role === 'CLIENTE';
  }

  isAdmin(){
    return this.role === 'ADMIN';
  }

}
