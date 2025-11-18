import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs'; // Importación de forkJoin
import { finalize, switchMap } from 'rxjs/operators';

import { Song, SongDto, UserDto } from '../../services/song';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfileComponent implements OnInit {

  userProfile: UserDto | null = null;
  favoriteSongs: SongDto[] = [];
  isLoading = true;
  usernameParam: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private songService: Song,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.usernameParam = params.get('username') || '';
        this.isLoading = true;
        
        return forkJoin({
            profile: this.songService.getPublicProfile(this.usernameParam),
            favorites: this.songService.getPublicFavorites(this.usernameParam)
        });
      }),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: ({ profile, favorites }) => {
        this.userProfile = profile;
        this.favoriteSongs = favorites;
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        this.router.navigate(['/dashboard/home']);
      }
    });
  }

  playSong(song: SongDto): void {
    this.playerService.playSong(song);
  }
}