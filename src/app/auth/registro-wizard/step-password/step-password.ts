import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-step-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './step-password.html',
  styleUrl: './step-password.css'
})
export class StepPassword implements OnInit {
  
  @Output() formValidity = new EventEmitter<boolean>();
  public passwordForm: FormGroup;
  hidePassword = true;

  validations = {
    hasLetter: false,
    hasNumberOrSpecial: false,
    hasTenChars: false
  };

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.pattern(/[a-zA-Z]/),
        Validators.pattern(/[\d!@#$%^&*()]/),
        Validators.minLength(10)
      ]]
    });

    this.passwordControl.valueChanges.subscribe(value => {
      this.validatePassword(value);
    });

    this.passwordForm.statusChanges.subscribe(status => {
      this.formValidity.emit(status === 'VALID');
    });
  }

  get passwordControl(): FormControl {
    return this.passwordForm.get('password') as FormControl;
  }

  validatePassword(password: string) {
    this.validations.hasLetter = /[a-zA-Z]/.test(password);
    this.validations.hasNumberOrSpecial = /[\d!@#$%^&*()]/.test(password);
    this.validations.hasTenChars = password.length >= 10;
  }
}