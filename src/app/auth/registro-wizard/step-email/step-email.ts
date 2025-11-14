import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth'; 
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-step-email',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        RouterLink,
        MatProgressSpinnerModule
    ],
    templateUrl: './step-email.html',
    styleUrl: './step-email.css'
})
export class StepEmail implements OnInit {

    emailForm: FormGroup;
    @Output() formValidity = new EventEmitter<boolean>(); // Comunicador al padre

    constructor(private fb: FormBuilder, private auth: Auth) {
        this.emailForm = this.fb.group({});
    }

    ngOnInit(): void {
        this.emailForm = this.fb.group({
            email: [
                '',
                [Validators.required, Validators.email],
                [this.usernameValidator(this.auth)]
            ]
        });

        // Suscripción a los cambios de estado del formulario
        this.emailForm.statusChanges.subscribe(status => {
            // El formulario es válido si el estado es 'VALID' y no está 'PENDING'
            const isValid = status === 'VALID' && !this.emailControl.pending;
            this.formValidity.emit(isValid);
        });
    }

    get emailControl(): FormControl {
        return this.emailForm.get('email') as FormControl;
    }

    usernameValidator(authService: Auth) {
        return (control: AbstractControl): Observable<any> => {
            const email = control.value;
            if (!email) {
                return of(null);
            }

            // Retrasamos 500ms para no saturar el servidor con peticiones
            return timer(500).pipe(
                switchMap(() => authService.checkUsername(email)),
                map(response => {
                    // Si el backend responde 'exists: true', devolvemos un error
                    return response.exists ? { usernameTaken: true } : null;
                }),
                catchError(() => of(null))
            );
        };
    }

    loginWithGoogle() {
        console.log('Botón de Google presionado. Implementación pendiente.');
    }
}