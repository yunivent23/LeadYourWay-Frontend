import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

interface AuthResponse{
  token: string;
}

@Component({
  selector: 'app-iniciosesion',
  imports: [CommonModule, MatIconModule,ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatDividerModule, MatCheckboxModule, RouterLink],
  templateUrl: './iniciosesion.html',
  styleUrl: './iniciosesion.css',
})
export class Iniciosesion implements OnInit{
  loginForm!:FormGroup;
  hidePassword=true;
  private readonly LOGIN_URL = 'http://localhost:8080/login'; // Reemplaza con tu endpoint real
  private readonly TOKEN_KEY = 'authToken';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password, rememberMe } = this.loginForm.value;

    try {
      // 1. Petición POST al backend de Spring Boot
      const response = await this.http.post<AuthResponse>(this.LOGIN_URL, { username, password }).toPromise();
      
      // Asegúrate de que el token esté presente en la respuesta
      if (response && response.token) {
        
        //almacenamiento del jwt
        const storage = rememberMe ? localStorage : sessionStorage;
        
        // Almacenar el token
        storage.setItem(this.TOKEN_KEY, response.token);

        this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 3000 });
        
        // 3. Redirigir al área principal (ej: /home)
        this.router.navigate(['/menu']);

      } else {
        this.snackBar.open('Error de autenticación: Token no recibido', 'Cerrar', { duration: 5000 });
      }

    } catch (error: any) {
      console.error('Error de login:', error);
      let errorMessage = 'Error al intentar conectar con el servidor.';
      
      if (error.status === 401) {
        errorMessage = 'Credenciales inválidas. Email o contraseña incorrectos.';
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
      
      this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
    }
  }
}
