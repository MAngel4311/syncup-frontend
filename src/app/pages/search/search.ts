import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';

// --- Imports de Angular Material ---
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// --- Servicios que ya tenemos ---
import { Song, SongDto } from '../../services/song';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent implements OnInit {

  // --- Propiedades para Búsqueda (RF-004) ---
  searchResults: SongDto[] = [];
  isLoadingSearch = false;
  
  // --- Propiedades para Autocompletado (RF-003) ---
  searchControl = new FormControl('');
  autocompleteResults$!: Observable<string[]>;

  constructor(
    private songService: Song,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    // Lógica de Autocompletado (RF-003)
    // Se activa 300ms después de que el usuario deja de teclear
    this.autocompleteResults$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(prefix => {
        if (!prefix || prefix.length < 2) {
          return []; // No buscar si es muy corto
        }
        return this.songService.autocomplete(prefix);
      })
    );
  }

  /**
   * Ejecuta la búsqueda avanzada (RF-004) al presionar Enter.
   * Usa el endpoint de búsqueda concurrente del backend.
   */
  onSearchSubmit(): void {
    const query = this.searchControl.value;
    if (!query) {
      this.searchResults = [];
      return;
    }

    this.isLoadingSearch = true;
    this.searchResults = [];

    this.songService.search(query).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.isLoadingSearch = false;
      },
      error: (err) => {
        console.error('Error en la búsqueda avanzada:', err);
        this.isLoadingSearch = false;
      }
    });
  }

  /**
   * Reproduce la canción seleccionada de la lista de resultados.
   */
  playSong(song: SongDto): void {
    this.playerService.playSong(song);
  }
}