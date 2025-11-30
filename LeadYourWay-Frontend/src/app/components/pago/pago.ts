import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-pago',
  imports: [MatFormField, MatError, MatLabel, ReactiveFormsModule, CommonModule],
  templateUrl: './pago.html',
  styleUrl: './pago.css',
})
export class Pago implements OnInit{
  form: FormGroup;
  stripePromise = loadStripe('pk_test_51SZ6JPDlRz5MgCyJdsp1b88ozEM4zXA12Tg0pOYMouZI1o8qdl4kd3bVtxuvlTeEmv3Eg7VIdtUX7PwJDA1C0CSI00JhhTN3eo'); // tu clave pública
  cardElement: any;
  cardErrors: string | null = null;
  clientSecret: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      amount: [1000, [Validators.required, Validators.min(50)]], // monto en centavos
    });
  }

  async ngOnInit() {
    const stripe = await this.stripePromise;
    const elements = stripe!.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');

    this.cardElement.on('change', (event: any) => {
      this.cardErrors = event.error ? event.error.message : null;
    });
  }

  async pagar() {
    if (this.form.invalid) return;

    // Crear PaymentIntent en tu backend
    this.http.post<{clientSecret: string}>('http://localhost:8080/api/payments/create-payment-intent', {
      amount: this.form.value.amount
    }).subscribe(async res => {
      this.clientSecret = res.clientSecret;
      const stripe = await this.stripePromise;

      const {paymentIntent, error} = await stripe!.confirmCardPayment(this.clientSecret!, {
        payment_method: {
          card: this.cardElement
        }
      });

      if (error) {
        alert(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        alert('Pago exitoso!');
      }
    });
  }
}
