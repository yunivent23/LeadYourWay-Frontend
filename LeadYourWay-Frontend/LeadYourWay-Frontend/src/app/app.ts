import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Usuariocomponent } from "./components/usuariocomponent/usuariocomponent";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Usuariocomponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LeadYourWay-Frontend');
}
