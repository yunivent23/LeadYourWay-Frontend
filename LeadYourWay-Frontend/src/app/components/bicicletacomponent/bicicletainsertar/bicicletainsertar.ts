import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { Users } from '../../../models/users';
import { Loginservice } from '../../../services/loginservice';
import { Bicicleta } from '../../../models/bicicleta';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Bicicletaservice } from '../../../services/bicicletaservice';

@Component({
  selector: 'app-bicicletainsertar',
  imports: [MatFormField, MatRadioGroup, MatLabel, MatRadioButton],
  templateUrl: './bicicletainsertar.html',
  styleUrl: './bicicletainsertar.css',
})
export class Bicicletainsertar implements OnInit{

  form: FormGroup=new FormGroup({});
  edicion:boolean=false;
  bicicleta: Bicicleta=new Bicicleta();
  id:number=0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bS: Bicicletaservice,
    private loginService:Loginservice,
    private formBuilder:FormBuilder
  ){}

  ngOnInit(): void {
    this.form=this.fb.group({
      idBicicleta: [''], // solo visible si edicion = true
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
      fechaPublicacion: [{ value: new Date(), disabled: true }]
    });

    this.route.params.subscribe((data:Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      
    })
  }
    init() {
      if (this.edicion) {
        this.bS.listId(this.id).subscribe((b) => {
          this.form.patchValue({
            idBicicleta: b.idBicicleta,
            descripcionBicicleta: b.descripcionBicicleta,
            tipoBicicleta: b.tipoBicicleta,
            modeloBicicleta: b.modeloBicicleta,
            marcaBicicleta: b.marcaBicicleta,
            colorBicicleta: b.colorBicicleta,
            estadoBicicleta: b.estadoBicicleta,
            ubicacionBicicleta: b.ubicacionBicicletaString,
            precioBicicleta: b.precioBicicleta,
            fotoBicicleta: b.fotoBicicleta,
            disponible: b.disponible,
            fechaPublicacion: b.fechaPublicacion
          });
        });
      }
    };

    aceptar(){

      if(this.form.invalid)return;


      let u = new Users();
      u.id = this.loginService.showUserId();

      this.bicicleta = new Bicicleta();
      this.bicicleta.idBicicleta = this.form.value.idBicicleta;
      this.bicicleta.descripcionBicicleta = this.form.value.descripcionBicicleta;
      this.bicicleta.tipoBicicleta = this.form.value.tipoBicicleta;
      this.bicicleta.modeloBicicleta = this.form.value.modeloBicicleta;
      this.bicicleta.marcaBicicleta = this.form.value.marcaBicicleta;
      this.bicicleta.colorBicicleta = this.form.value.colorBicicleta;
      this.bicicleta.estadoBicicleta = this.form.value.estadoBicicleta;
      this.bicicleta.ubicacionBicicletaString = this.form.value.ubicacionBicicleta;
      this.bicicleta.precioBicicleta = this.form.value.precioBicicleta;
      this.bicicleta.fotoBicicleta = this.form.value.fotoBicicleta;
      this.bicicleta.disponible = this.form.value.disponible;

      // Fecha automática si es registro
      this.bicicleta.fechaPublicacion = this.edicion
        ? this.form.get('fechaPublicacion')?.value
        : new Date();

      // Asignación del usuario suministrador
      this.bicicleta.usuario = u;

      // Lógica guardar / editar
      if (this.edicion) {
        this.bS.update(this.bicicleta).subscribe(() => {
          this.router.navigate(['bicicletas']);
        });
      } else {
        this.bS.insert(this.bicicleta).subscribe(() => {
          this.router.navigate(['bicicletas']);
        });
      }
      }
    
  }
