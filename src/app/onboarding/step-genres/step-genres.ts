import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Song } from '../../services/song';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-step-genres',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    HttpClientModule
  ],
  templateUrl: './step-genres.html',
  styleUrl: './step-genres.css'
})
export class StepGenres implements OnInit {
  @Output() formValidity = new EventEmitter<boolean>();
  @Output() selectionChange = new EventEmitter<Set<string>>();

  allGenres: string[] = [];
  selectedGenres: Set<string> = new Set();

  constructor(private songService: Song) {}

  ngOnInit(): void {
    this.songService.getAvailableGenres().subscribe({
      next: (genres) => {
        this.allGenres = genres.filter(g => g && g.trim() !== '');
      },
      error: (err) => {
        console.error('Error al cargar géneros:', err);
        this.allGenres = ['Pop', 'Rock', 'Urbano', 'Salsa', 'Vallenato', 'Electronica', 'Clasica', 'Jazz', 'Folk', 'Hip Hop', 'Bolero','Reggaeton','Merengue'];
      }
    });
  }

  toggleGenre(genre: string): void {
    if (this.selectedGenres.has(genre)) {
      this.selectedGenres.delete(genre);
    } else {
      if (this.selectedGenres.size < 3) {
        this.selectedGenres.add(genre);
      }
    }
    this.checkValidity();
    this.selectionChange.emit(this.selectedGenres);
  }

  isSelected(genre: string): boolean {
    return this.selectedGenres.has(genre);
  }
  
  checkValidity(): void {
    const isValid = this.selectedGenres.size === 3;
    this.formValidity.emit(isValid);
  }
}