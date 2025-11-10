import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-usuariolistarcomponent',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './usuariolistarcomponent.html',
  styleUrl: './usuariolistarcomponent.css',
})
export class Usuariolistarcomponent {
  dataSource: MatTableDataSource<Usuario>=new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];

  constructor(private uS:)
}
