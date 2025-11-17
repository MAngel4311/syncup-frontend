import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { StepArtists } from '../step-artists/step-artists';
import { StepGenres } from '../step-genres/step-genres';

@Component({
  selector: 'app-onboarding-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    StepArtists,
    StepGenres
  ],
  templateUrl: './onboarding-layout.html',
  styleUrl: './onboarding-layout.css'
})
export class OnboardingLayout {
  currentStep = 1;
  isStepValid = false;

  constructor(private router: Router) {}

  onStepValidityChange(isValid: boolean) {
    this.isStepValid = isValid;
  }

  nextStep() {
    if (!this.isStepValid) return;
    this.currentStep++;
    this.isStepValid = false;
  }

  finishOnboarding() {
    if (!this.isStepValid) return;
    console.log("Asistente completado. Redirigiendo al dashboard...");
    
    this.router.navigate(['/dashboard']);
  }
}