import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Usuariolistar } from "./usuariolistar/usuariolistar";

@Component({
  selector: 'app-usuariocomponent',
  imports: [RouterOutlet, Usuariolistar],
  templateUrl: './usuariocomponent.html',
  styleUrl: './usuariocomponent.css',
})
export class Usuariocomponent {
  constructor(public route:ActivatedRoute){}
}
