import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { StepArtists } from '../step-artists/step-artists';
import { StepGenres } from '../step-genres/step-genres';
import { Auth } from '../../services/auth';

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
  
  selectedArtists: Set<string> = new Set();
  selectedGenres: Set<string> = new Set();

  constructor(private router: Router, private authService: Auth) {}

  onStepValidityChange(isValid: boolean) {
    this.isStepValid = isValid;
  }
  
  onArtistsChange(artists: Set<string>) {
    this.selectedArtists = artists;
  }

  onGenresChange(genres: Set<string>) {
    this.selectedGenres = genres;
  }

  nextStep() {
    if (!this.isStepValid) return;
    this.currentStep++;
    this.isStepValid = false;
  }

  finishOnboarding() {
    if (!this.isStepValid) return;
    
    const artistas = Array.from(this.selectedArtists);
    const generos = Array.from(this.selectedGenres);

    this.authService.completeOnboarding(artistas, generos).subscribe({
      next: () => {
        this.authService.updateOnboardingStatus(true);
        console.log("Onboarding completado y guardado. Redirigiendo al dashboard...");
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("Error al guardar el onboarding:", err);
      }
    });
  }
}