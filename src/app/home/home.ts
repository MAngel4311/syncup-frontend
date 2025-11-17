import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Song, SongDto, UserDto } from '../services/song';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    HttpClientModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  discoverWeekly: SongDto[] = [];
  userSuggestions: UserDto[] = [];

  constructor(private songService: Song) {}

  ngOnInit(): void {
    this.songService.getDiscoverWeekly().subscribe({
      next: (songs: SongDto[]) => this.discoverWeekly = songs,
      error: (err: any) => console.error('Error al cargar discover weekly:', err)
    });

    this.songService.getUserSuggestions().subscribe({
      next: (users: UserDto[]) => this.userSuggestions = users,
      error: (err: any) => console.error('Error al cargar sugerencias de usuarios:', err)
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
}