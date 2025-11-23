import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Bicicletalistar } from "./bicicletalistar/bicicletalistar";

@Component({
  selector: 'app-bicicletacomponent',
  imports: [RouterOutlet, Bicicletalistar],
  templateUrl: './bicicletacomponent.html',
  styleUrl: './bicicletacomponent.css',
})
export class Bicicletacomponent {
  constructor(public route:ActivatedRoute){}
}
