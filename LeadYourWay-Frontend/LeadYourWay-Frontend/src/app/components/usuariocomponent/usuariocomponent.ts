import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuariocomponent',
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, MatMenuModule,RouterLink],
  templateUrl: './usuariocomponent.html',
  styleUrl: './usuariocomponent.css',
})
export class Usuariocomponent {

}
