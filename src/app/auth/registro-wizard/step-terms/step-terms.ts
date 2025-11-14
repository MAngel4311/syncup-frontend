import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-step-terms',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule
  ],
  templateUrl: './step-terms.html',
  styleUrl: './step-terms.css'
})
export class StepTerms {
  marketingConsent = false;
  dataSharingConsent = false;
  termsAccepted = false;
}