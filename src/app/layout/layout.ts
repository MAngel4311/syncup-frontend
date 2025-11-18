import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('audioElement') audioElementRef!: ElementRef<HTMLAudioElement>;

  userName: string = '';
  isAdmin: boolean = false;
  currentSong: SongDto | null = null;
  currentSongUrl: string = '';
  isPlaying: boolean = false;
  queueCount: number = 0;
  
  private playerSubscription: Subscription | null = null;
  private queueSubscription: Subscription | null = null;

  constructor(
    private auth: Auth, 
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.userName = this.auth.getUserName();
    this.isAdmin = this.auth.isAdmin();
    
    this.playerSubscription = this.playerService.currentSong$.subscribe(song => {
      this.currentSong = song;
      this.currentSongUrl = song ? this.playerService.getSongUrl(song) : '';
      this.isPlaying = !!song;
      
      if (this.audioElementRef && this.audioElementRef.nativeElement) {
          if (song) {
              this.audioElementRef.nativeElement.load();
              this.audioElementRef.nativeElement.play();
          } else {
              this.audioElementRef.nativeElement.pause();
          }
      }
    });
    
    this.queueSubscription = this.playerService.queue$.subscribe(queue => {
        this.queueCount = queue.length;
    });
  }

  ngOnDestroy(): void {
    if (this.playerSubscription) {
      this.playerSubscription.unsubscribe();
    }
    if (this.queueSubscription) {
        this.queueSubscription.unsubscribe();
    }
  }
  
  togglePlayPause(): void {
      if (this.audioElementRef && this.audioElementRef.nativeElement) {
          const audio = this.audioElementRef.nativeElement;
          if (this.isPlaying) {
              audio.pause();
          } else {
              audio.play();
          }
          this.isPlaying = !this.isPlaying;
      }
  }
  
  playNext(): void {
      this.playerService.playNext();
  }

  playPrevious(): void {
      this.playerService.playPrevious();
  }

  canPlayNext(): boolean {
      return this.queueCount > 0;
  }
  
  canPlayPrevious(): boolean {
      const history = this.playerService.getHistoryValue();
      return history.length > 0;
  }
  
  onSongEnded(): void {
      this.playerService.playNext();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}