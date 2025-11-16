import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
        MatProgressSpinnerModule
    ],
    templateUrl: './step-email.html',
    styleUrl: './step-email.css'
})
export class StepEmail implements OnInit {

    public emailForm: FormGroup;
    @Output() formValidity = new EventEmitter<boolean>();

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

        this.emailForm.statusChanges.subscribe(status => {
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
            
            return timer(500).pipe(
                switchMap(() => authService.checkUsername(email)),
                map(response => {
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