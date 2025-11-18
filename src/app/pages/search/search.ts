import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router'; // Importación necesaria para la función startRadio

// --- Imports de Angular Material ---
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip'; // Añadida para el tooltip del botón de Radio

// --- Servicios que ya tenemos ---
import { Song, SongDto, UserDto } from '../../services/song';
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
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink
  ],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent implements OnInit {

  // --- Resultados de Búsqueda ---
  searchResults: SongDto[] = [];
  userSearchResults: UserDto[] = [];
  isLoadingSearch = false;
  
  // --- Autocompletado ---
  searchControl = new FormControl('');
  autocompleteResults$!: Observable<string[]>;

  constructor(
    private songService: Song,
    private playerService: PlayerService,
    private router: Router // Inyección del router
  ) {}

  ngOnInit(): void {
    this.autocompleteResults$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(prefix => {
        if (!prefix || prefix.length < 2) {
          return [];
        }
        return this.songService.autocomplete(prefix);
      })
    );
  }

  /**
   * Ejecuta la búsqueda de Canciones y Usuarios en paralelo.
   */
  onSearchSubmit(): void {
    const query = this.searchControl.value;
    if (!query) {
      this.searchResults = [];
      this.userSearchResults = [];
      return;
    }

    this.isLoadingSearch = true;
    this.searchResults = [];
    this.userSearchResults = [];

    forkJoin({
      songs: this.songService.search(query),
      users: this.songService.searchUsers(query)
    }).subscribe({
      next: ({ songs, users }) => {
        this.searchResults = songs;
        this.userSearchResults = users.filter(u => u.rol !== 'ADMIN');
        this.isLoadingSearch = false;
      },
      error: (err) => {
        console.error('Error en la búsqueda:', err);
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
  
  /**
   * Conecta con el endpoint de seguimiento (RF-007)
   */
  followUser(user: UserDto): void {
    this.songService.followUser(user.username).subscribe({
      next: (response) => {
        console.log(response);
        this.userSearchResults = this.userSearchResults.filter(u => u.username !== user.username);
        alert(`¡Ahora sigues a ${user.nombre}!`);
      },
      error: (err) => console.error('Error al seguir usuario:', err)
    });
  }

  /**
   * Inicia la Radio (RF-006) a partir de una canción de los resultados.
   */
  startRadio(event: MouseEvent, song: SongDto): void {
    event.stopPropagation();

    this.songService.startRadio(song.id).subscribe({
      next: (queue) => {
        this.playerService.playQueue(queue);
        alert(`Radio iniciada con ${queue.length} canciones similares.`);
        // Navegar a home para ver la cola/player
        this.router.navigate(['/dashboard/home']); 
      },
      error: (err) => console.error('Error al iniciar Radio:', err)
    });
  }
}