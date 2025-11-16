import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-step-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './step-profile.html',
  styleUrl: './step-profile.css'
})
export class StepProfile implements OnInit {

  @Output() formValidity = new EventEmitter<boolean>();
  public profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: ['', [Validators.required]],
      fechaNacimiento: [null, [Validators.required]],
      genero: ['', [Validators.required]]
    });

    this.profileForm.statusChanges.subscribe(status => {
      this.formValidity.emit(status === 'VALID');
    });
  }
}