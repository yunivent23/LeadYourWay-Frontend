import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { Users } from '../../../models/users';
import { Loginservice } from '../../../services/loginservice';
import { Bicicleta } from '../../../models/bicicleta';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Bicicletaservice } from '../../../services/bicicletaservice';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Usuarioservice } from '../../../services/usuarioservice';

@Component({
  selector: 'app-bicicletainsertar',
  imports: [
    MatFormFieldModule,
    MatRadioGroup,
    MatLabel,
    MatRadioButton,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './bicicletainsertar.html',
  styleUrl: './bicicletainsertar.css',
})
export class Bicicletainsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  bicicleta: Bicicleta = new Bicicleta();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private bS: Bicicletaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idBicicleta: [''],
      usuarioId: ['', Validators.required], // ID ingresado manualmente
      descripcionBicicleta: ['', Validators.required],
      tipoBicicleta: ['', Validators.required],
      modeloBicicleta: ['', Validators.required],
      marcaBicicleta: ['', Validators.required],
      colorBicicleta: ['', Validators.required],
      estadoBicicleta: ['', Validators.required],
      ubicacionBicicleta: ['', Validators.required],
      precioBicicleta: ['', Validators.required],
      fotoBicicleta: ['', Validators.required],
      disponible: [true, Validators.required],
      fechaPublicacion: [{ value: new Date(), disabled: true }],
    });
  }

  init() {
    if (this.edicion) {
      this.bS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idBicicleta: new FormControl(data.idBicicleta),
          usuarioId: new FormControl(data.usuario?.id),
          descripcionBicicleta: new FormControl(data.descripcionBicicleta),
          tipoBicicleta: new FormControl(data.tipoBicicleta),
          modeloBicicleta: new FormControl(data.modeloBicicleta),
          marcaBicicleta: new FormControl(data.marcaBicicleta),
          colorBicicleta: new FormControl(data.colorBicicleta),
          estadoBicicleta: new FormControl(data.estadoBicicleta),
          ubicacionBicicleta: new FormControl(data.ubicacionBicicleta),
          precioBicicleta: new FormControl(data.precioBicicleta),
          fotoBicicleta: new FormControl(data.fotoBicicleta),
          disponible: new FormControl(data.disponible),
          fechaPublicacion: new FormControl(data.fechaPublicacion),
        });
      });
    }
  }

  aceptar(): void {
    if (this.form.valid) {
      this.bicicleta.idBicicleta = this.form.value.idBicicleta;
      this.bicicleta.usuario = { id: this.form.value.usuarioId } as any; // ID ingresado
      this.bicicleta.descripcionBicicleta = this.form.value.descripcionBicicleta;
      this.bicicleta.tipoBicicleta = this.form.value.tipoBicicleta;
      this.bicicleta.modeloBicicleta = this.form.value.modeloBicicleta;
      this.bicicleta.marcaBicicleta = this.form.value.marcaBicicleta;
      this.bicicleta.colorBicicleta = this.form.value.colorBicicleta;
      this.bicicleta.estadoBicicleta = this.form.value.estadoBicicleta;
      this.bicicleta.ubicacionBicicleta = this.form.value.ubicacionBicicleta;
      this.bicicleta.precioBicicleta = this.form.value.precioBicicleta;
      this.bicicleta.fotoBicicleta = this.form.value.fotoBicicleta;
      this.bicicleta.disponible = this.form.value.disponible;
      this.bicicleta.fechaPublicacion = this.edicion
        ? this.form.get('fechaPublicacion')?.value
        : new Date();

      if (this.edicion) {
        this.bS.update(this.bicicleta).subscribe(() => {
          this.bS.list().subscribe((data) => this.bS.setList(data));
          this.router.navigate(['bicicletas']);
        });
      } else {
        this.bS.insert(this.bicicleta).subscribe(() => {
          this.bS.list().subscribe((data) => this.bS.setList(data));
          this.router.navigate(['bicicletas']);
        });
      }
    }
  }
}
