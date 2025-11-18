import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      currentPassword: [''],
      newPassword: ['']
    });
  }

  ngOnInit(): void {
    const currentName = this.authService.getUserName();
    this.profileForm.patchValue({ nombre: currentName });
  }

  onUpdateProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }

    const { nombre, currentPassword, newPassword } = this.profileForm.value;
    
    // Si la contraseña nueva está vacía, borrar los campos de password
    let updatePayload: any = { nombre };
    if (newPassword) {
        if (!currentPassword) {
            this.snackBar.open('Debes ingresar tu contraseña actual para cambiarla.', 'Cerrar', { duration: 3000 });
            return;
        }
        updatePayload = { ...updatePayload, currentPassword, newPassword };
    }

    this.authService.updateProfile(updatePayload).subscribe({
      next: (response) => {
        this.snackBar.open('Perfil actualizado con éxito.', 'Cerrar', { duration: 3000 });
        
        // Actualizar el nombre en el layout
        const layoutComponent = this.authService.getUserName(); 
        
        // Resetear solo los campos de contraseña en el formulario
        this.profileForm.patchValue({ 
            currentPassword: '', 
            newPassword: ''
        });
        
        window.location.reload(); // Forzar la recarga para actualizar el nombre en el sidebar
      },
      error: (err) => {
        const errorMsg = err.error || 'Error al actualizar el perfil.';
        this.snackBar.open(errorMsg, 'Cerrar', { duration: 5000 });
      }
    });
  }
}