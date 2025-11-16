import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { StepEmail } from './step-email/step-email';
import { StepPassword } from './step-password/step-password';
import { StepProfile } from './step-profile/step-profile';
import { StepTerms } from './step-terms/step-terms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-registro-wizard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    StepEmail,
    StepPassword,
    StepProfile,
    StepTerms
  ],
  templateUrl: './registro-wizard.html',
  styleUrl: './registro-wizard.css'
})
export class RegistroWizard {

  currentStep: number = 1;
  stepValidity: boolean[] = [false, false, false, false];

  @ViewChild(StepEmail) stepEmail!: StepEmail;
  @ViewChild(StepPassword) stepPassword!: StepPassword;
  @ViewChild(StepProfile) stepProfile!: StepProfile;
  @ViewChild(StepTerms) stepTerms!: StepTerms;

  constructor(private auth: Auth, private router: Router) { }

  updateValidity(stepIndex: number, isValid: boolean) {
    this.stepValidity[stepIndex - 1] = isValid;
  }

  isCurrentStepValid(): boolean {
    return this.stepValidity[this.currentStep - 1];
  }

  nextStep() {
    if (this.currentStep < 4 && this.isCurrentStepValid()) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (!this.stepValidity.every(valid => valid)) {
      console.error('El formulario no es válido.');
      return;
    }

    const emailData = this.stepEmail.emailForm.value;
    const passwordData = this.stepPassword.passwordForm.value;
    const profileData = this.stepProfile.profileForm.value;
    
    const registrationData = {
      username: emailData.email,
      password: passwordData.password,
      nombre: profileData.nombre,
      fechaNacimiento: this.formatDate(profileData.fechaNacimiento),
      genero: profileData.genero
    };

    console.log('Enviando al backend:', registrationData);

    this.auth.register(registrationData).subscribe({
      next: (response: any) => {
        console.log('Registro exitoso!', response);
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Error en el registro:', err);
      }
    });
  }

  private formatDate(date: Date | null): string | null {
    if (!date) return null;
    const d = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return d.toISOString().split('T')[0];
  }
}