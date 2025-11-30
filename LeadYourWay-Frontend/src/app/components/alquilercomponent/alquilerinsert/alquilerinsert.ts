import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Alquiler } from '../../../models/alquiler';
import { Alquilerservice } from '../../../services/alquilerservice';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Bicicletaservice } from '../../../services/bicicletaservice';

@Component({
  selector: 'app-alquilerinsert',
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule, RouterLink],
  templateUrl: './alquilerinsert.html',
  styleUrl: './alquilerinsert.css',
})
export class Alquilerinsert implements OnInit{
  form:FormGroup=new FormGroup({});
  alquiler:Alquiler=new Alquiler();
  id:number=0;
  today=new Date();
  estadosAlquiler: { value: string; viewValue: string }[] = [
    { value: 'Activo', viewValue: 'Activo' },
    { value: 'Finalizado', viewValue: 'Finalizado' },
    { value: 'Cancelado', viewValue: 'Cancelado' },
  ];

  edicion:boolean=false;

  constructor(
    private aS: Alquilerservice,
    private router: Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private uS:Usuarioservice,
    private bS:Bicicletaservice
  ){}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      idAlquiler: [0],
      precioTotal: ['', [Validators.required, Validators.min(0.01)]],
      estadoAlquiler: ['Activo', [Validators.required]], // Default 'Activo'
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      idBicicleta: ['', [Validators.required, Validators.min(1)]],
      idCliente: ['', [Validators.required, Validators.min(1)]],
      idSuministrador: ['', [Validators.required, Validators.min(1)]],
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      if(this.edicion){
        this.init();
      }
    });

  }

  iniciarPago(): void {
    if (this.form.valid) {
      const formValue = this.form.value;

      // 1. Mapeo de campos directos al modelo
      this.alquiler.idAlquiler = this.edicion ? formValue.idAlquiler : 0;
      this.alquiler.precioTotal = formValue.precioTotal;
      this.alquiler.estadoAlquiler = formValue.estadoAlquiler;

      // Por ser un NUEVO alquiler, el estadoPago es siempre 'false' (Pendiente) antes del pago
      this.alquiler.estadoPago = false; 

      // 2. Formato de fechas (LocalDate en Java necesita 'YYYY-MM-DD')
      // Aunque el modelo TS usa Date, al enviar por HTTP se necesita el formato de string
      this.alquiler.fechaInicio = formValue.fechaInicio.toDate();
      this.alquiler.fechaFin = formValue.fechaFin.toDate();

      // 3. Mapeo de las FKs a la estructura anidada del modelo (solo IDs)
      this.alquiler.bicicleta.idBicicleta = formValue.idBicicleta;
      this.alquiler.cliente.id = formValue.idCliente;
      this.alquiler.suministrador.id = formValue.idSuministrador;
      
      // --- Lógica del servicio: Pre-registro y Pago ---

      // 1. Enviar el objeto de Alquiler al servidor con estadoPago=false (pendiente)
      //    Esto puede ser un pre-registro para obtener un ID de transacción o referencia.
      
      // 2. Navegar o llamar al componente/servicio de Pago con la información necesaria.
      console.log('Datos del Alquiler listos para Pago:', JSON.stringify(this.alquiler, null, 2));
      alert(`Iniciando flujo de pago para: S/${this.alquiler.precioTotal}. Redireccionando...`);
      
      // Opción recomendada: Navegar al componente de pago
      this.router.navigate(['/pago', {
        monto: this.alquiler.precioTotal,
        referencia: 'ALQ-' + Date.now(),
        alquilerData: JSON.stringify(this.alquiler)
      }]);
      
    }
  }



  init(){

  }
}
