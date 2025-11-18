import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Auth } from '../services/auth';
import { PlayerService } from '../services/player.service';
import { SongDto } from '../services/song';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit, OnDestroy {

  userName: string = '';
  isAdmin: boolean = false;
  currentSong: SongDto | null = null;
  currentSongUrl: string = '';
  private playerSubscription: Subscription | null = null;

  constructor(
    private auth: Auth, 
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.userName = this.auth.getUserName();
    this.isAdmin = this.auth.isAdmin();
    
    this.playerSubscription = this.playerService.currentSong$.subscribe(song => {
      if (song) {
        this.currentSong = song;
        this.currentSongUrl = this.playerService.getSongUrl(song);
      } else {
        this.currentSong = null;
        this.currentSongUrl = '';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.playerSubscription) {
      this.playerSubscription.unsubscribe();
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}