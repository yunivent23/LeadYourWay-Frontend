import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Usuariocomponent } from "./components/usuariocomponent/usuariocomponent";
import { Menu } from "./components/menu/menu";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Usuariocomponent, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LeadYourWay-Frontend');
}
