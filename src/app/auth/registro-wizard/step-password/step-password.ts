import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './step-password.html',
  styleUrl: './step-password.css'
})
export class StepPassword {
  password = '';
  hidePassword = true;

  validations = {
    hasLetter: false,
    hasNumberOrSpecial: false,
    hasTenChars: false
  };

  validatePassword() {
    const password = this.password;
    this.validations.hasLetter = /[a-zA-Z]/.test(password);
    this.validations.hasNumberOrSpecial = /[\d!@#$%^&*()]/.test(password);
    this.validations.hasTenChars = password.length >= 10;
  }
}