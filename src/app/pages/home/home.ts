import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Song, SongDto, UserDto } from '../../services/song';
import { HttpClientModule } from '@angular/common/http';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  discoverWeekly: SongDto[] = [];
  userSuggestions: UserDto[] = [];
  favoriteSongIds = new Set<number>();
  followingUsernames = new Set<string>(); // NUEVO: Para saber a quién seguimos

  constructor(
    private songService: Song,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.loadSuggestions();
    
    this.songService.getDiscoverWeekly().subscribe({
      next: (songs: SongDto[]) => this.discoverWeekly = songs,
      error: (err: any) => console.error('Error al cargar discover weekly:', err)
    });
  }

  loadSuggestions(): void {
    this.songService.getUserSuggestions().subscribe({
      next: (users: UserDto[]) => this.userSuggestions = users,
      error: (err: any) => console.error('Error al cargar sugerencias de usuarios:', err)
    });
    // Nota: Aquí se debería cargar también la lista de 'seguidos' para filtrar/actualizar
    // Pero por simplicidad, lo haremos asumiendo que las sugerencias no incluyen seguidos
  }

  loadFavorites(): void {
    this.songService.getFavorites().subscribe({
      next: (favorites) => {
        this.favoriteSongIds.clear();
        favorites.forEach(song => this.favoriteSongIds.add(song.id));
      },
      error: (err) => console.error('Error al cargar favoritos:', err)
    });
  }

  getSongCoverPath(song: SongDto): string {
    return `assets/images/covers/${song.titulo}.jpg`;
  }

  getUserInitials(user: UserDto): string {
    const names = user.nombre.split(' ');
    const initials = names.map((n: string) => n[0]).join('');
    return initials.substring(0, 2).toUpperCase();
  }

  playSong(song: SongDto): void {
    this.playerService.playSong(song);
  }

  isFavorite(song: SongDto): boolean {
    return this.favoriteSongIds.has(song.id);
  }

  toggleFavorite(event: MouseEvent, song: SongDto): void {
    event.stopPropagation();

    const isFav = this.isFavorite(song);

    if (isFav) {
      this.songService.removeFavorite(song.id).subscribe({
        next: (favorites) => this.updateFavoritesSet(favorites),
        error: (err) => console.error('Error al quitar favorito:', err)
      });
    } else {
      this.songService.addFavorite(song.id).subscribe({
        next: (favorites) => this.updateFavoritesSet(favorites),
        error: (err) => console.error('Error al añadir favorito:', err)
      });
    }
  }

  private updateFavoritesSet(favorites: SongDto[]): void {
    this.favoriteSongIds.clear();
    favorites.forEach(song => this.favoriteSongIds.add(song.id));
  }

  // Gestión de Seguidores
  followUser(user: UserDto): void {
    this.songService.followUser(user.username).subscribe({
      next: (response) => {
        console.log(response);
        // Quitar al usuario de la lista de sugerencias después de seguirlo
        this.userSuggestions = this.userSuggestions.filter(u => u.username !== user.username);
        // Opcional: Mostrar notificación de éxito
      },
      error: (err) => console.error('Error al seguir usuario:', err)
    });
  }
}