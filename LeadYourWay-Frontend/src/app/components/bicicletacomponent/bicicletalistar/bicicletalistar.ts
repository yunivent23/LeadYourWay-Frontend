import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Bicicletaservice } from '../../../services/bicicletaservice';
import { Router, RouterLink } from '@angular/router';
import { Bicicleta } from '../../../models/bicicleta';
import { Loginservice } from '../../../services/loginservice';

type UserRole = 'cliente' | 'suministrador' | 'invitado';

@Component({
  selector: 'app-bicicletalistar',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './bicicletalistar.html',
  styleUrl: './bicicletalistar.css',
})
export class Bicicletalistar implements OnInit {
  rolUsuario: string | null = null;
  bicicletas: Bicicleta[] = []; // Usar minúsculas para el rol para que coincida con la condición en el HTML
  currentUserRole: UserRole = 'suministrador';

  constructor(
    private bS: Bicicletaservice,
    private router: Router,
    private loginService: Loginservice
  ) {} // Inyectar Router

  ngOnInit(): void {
    this.rolUsuario = this.loginService.showRole();
    this.bS.list().subscribe((data) => {
      this.bicicletas = data;
      this.bS.setList(data);
    });

    this.bS.getList().subscribe((data) => {
      this.bicicletas = data;
    });
  }

  esCliente(): boolean {
    return this.rolUsuario === 'CLIENTE';
  }

  esSuministrador(): boolean {
    return this.rolUsuario === 'SUMINISTRADOR';
  }

  listBicicletas(): void {
    this.bS.list().subscribe((data) => {
      this.bicicletas = data;
      this.bS.setList(data);
    });
  }

  onEdit(bicicleta: Bicicleta): void {
    console.log('Navegando a edición de:', bicicleta.idBicicleta);
    this.router.navigate(['/bicicletas/editar', bicicleta.idBicicleta]);
  }

  onDelete(bicicleta: Bicicleta): void {
    if (
      confirm(
        `¿Estás seguro de que quieres eliminar la bicicleta modelo ${bicicleta.modeloBicicleta}?`
      )
    ) {
      this.eliminar(bicicleta.idBicicleta);
    }
  }

  eliminar(id: number): void {
    this.bS.delete(id).subscribe({
      next: () => {
        // No se necesita el 'data' del 'next' ya que el backend retorna 'text'
        console.log(`Bicicleta ${id} eliminada.`);
        this.bS.list().subscribe((data) => {
          this.bS.setList(data);
        });
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
      },
    });
  }

  verMasInfo(bici: Bicicleta) {
  // Incrementar vistas
  bici.vistas = (bici.vistas ?? 0) + 1;

  // Enviar actualización al backend
  this.bS.update(bici).subscribe(() => {
    console.log("Vistas actualizadas:", bici.vistas);

    // Luego de actualizar, navegar a la vista de detalle
    this.router.navigate(['bicicletas', bici.idBicicleta]);
  });
}

}
