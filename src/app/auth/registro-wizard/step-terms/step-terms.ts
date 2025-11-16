import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-step-terms',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './step-terms.html',
  styleUrl: './step-terms.css'
})
export class StepTerms implements OnInit {

  @Output() formValidity = new EventEmitter<boolean>();
  public termsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.termsForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.termsForm = this.fb.group({
      marketingConsent: [false],
      dataSharingConsent: [false],
      termsAccepted: [false, [Validators.requiredTrue]]
    });

    this.termsForm.statusChanges.subscribe(status => {
      this.formValidity.emit(status === 'VALID');
    });
  }
}