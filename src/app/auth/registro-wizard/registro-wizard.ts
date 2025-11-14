import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { StepEmail } from './step-email/step-email';
import { StepPassword } from './step-password/step-password';
import { StepProfile } from './step-profile/step-profile';
import { StepTerms } from './step-terms/step-terms';

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
    // Array para mantener el estado de validez de cada paso [email, password, profile, terms]
    stepValidity: boolean[] = [false, false, false, false];

    constructor() { }

    // Función llamada por el componente hijo para actualizar su estado de validez
    updateValidity(stepIndex: number, isValid: boolean) {
        this.stepValidity[stepIndex - 1] = isValid;
    }

    // Verifica si el botón 'Siguiente' debe estar habilitado
    isCurrentStepValid(): boolean {
        // En el último paso, el botón 'Siguiente' cambia a 'Registrarse' (se maneja en onSubmit)
        // Solo necesitamos que el paso 1, 2 o 3 sea válido para avanzar.
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
        // La lógica de registro final se ejecutará aquí.
        console.log('REGISTRO ENVIADO (Implementación pendiente)');
    }
}