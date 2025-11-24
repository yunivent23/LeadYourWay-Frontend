import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Iniciosesion } from "./iniciosesion/iniciosesion";

@Component({
  selector: 'app-sesion',
  imports: [RouterOutlet],
  templateUrl: './sesion.html',
  styleUrl: './sesion.css',
})
export class Sesion {
  constructor(public route:ActivatedRoute){}
}
