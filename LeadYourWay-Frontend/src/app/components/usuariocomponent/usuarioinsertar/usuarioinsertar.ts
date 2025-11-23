import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Users } from '../../../models/users';
import { Usuarioservice } from '../../../services/usuarioservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { I } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-usuarioinsertar',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
  ],
  templateUrl: './usuarioinsertar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './usuarioinsertar.css',
})
export class Usuarioinsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  us: Users = new Users();
  id: number = 0;
  today = new Date();

  edicion: boolean = false;
  estado: boolean = true;

  tipos: { value: string; viewValue: string }[] = [
    { value: 'CLIENTE', viewValue: 'Cliente' },
    { value: 'SUMINISTRADOR', viewValue: 'Suministrador' },
  ];

  //fotoooooooooo
  selectedFile: File | null = null;
  fileName: string = '';
  selectedFilePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    // Obtenemos el primer archivo seleccionado
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;

      // Usamos FileReader para generar la vista previa (Base64)
      const reader = new FileReader();

      // Cuando la lectura esté completa, asignamos el resultado a la variable de vista previa
      reader.onload = (e) => {
        this.selectedFilePreview = e.target?.result || null;
      };

      // Lee el archivo como una URL de datos (Base64)
      reader.readAsDataURL(file);
    } else {
      // Si el usuario cancela la selección de archivos, limpiamos las variables
      this.selectedFile = null;
      this.fileName = '';
      this.selectedFilePreview = null;
    }
  }

  constructor(
    private uS: Usuarioservice,
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
      id: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: [false, Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.required],
      fecha: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      roles: ['', Validators.required],
      fotoUsuario: [''],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.us.id = this.form.value.id;
      this.us.username = this.form.value.username;
      this.us.password = this.form.value.username;
      this.us.telefono = this.form.value.telefono;
      this.us.dni = this.form.value.dni;
      this.us.email = this.form.value.email;
      this.us.direccion = this.form.value.direccion;
      this.us.enabled = this.form.value.enabled;
      this.us.fecha = this.form.value.fecha;
      this.us.roles = this.form.value.roles;
      this.us.fotoUsuario = this.form.value.fotoUsuario;
      if (this.edicion) {
        this.uS.update(this.us).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.us).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['users']);
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id:new FormControl(data.id),
          username:new FormControl(data.username),
          password:new FormControl(data.password),
          enabled:new FormControl(data.enabled),
          dni: new FormControl(data.dni),
          email:new FormControl(data.email),
          fecha:new FormControl(data.fecha),
          telefono:new FormControl(data.telefono),
          direccion: new FormControl(data.direccion),
          roles: new FormControl(data.roles),
          fotoUsuario: new FormControl(data.fotoUsuario),
        });
      });
    }
  }
}
