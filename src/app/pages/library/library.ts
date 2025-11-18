import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Song, SongDto } from '../../services/song';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class LibraryComponent implements OnInit {

  favoriteSongs: SongDto[] = [];
  isLoading = true;

  constructor(
    private songService: Song,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.songService.getFavorites().subscribe({
      next: (songs) => {
        this.favoriteSongs = songs;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar favoritos:', err);
        this.isLoading = false;
      }
    });
  }

  playSong(song: SongDto): void {
    this.playerService.playSong(song);
  }

  exportToCsv(): void {
    this.songService.exportFavorites().subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'mis_favoritos.csv';
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error: (err) => console.error('Error al exportar CSV:', err)
    });
  }

  removeSong(event: MouseEvent, song: SongDto): void {
    event.stopPropagation();
    
    this.songService.removeFavorite(song.id).subscribe({
      next: (updatedFavorites) => {
        this.favoriteSongs = updatedFavorites;
      },
      error: (err) => console.error('Error al quitar favorito:', err)
    });
  }
}