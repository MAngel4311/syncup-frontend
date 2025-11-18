import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SongDto } from './song';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private readonly API_URL = 'http://localhost:8080';
  
  private currentSongSubject = new BehaviorSubject<SongDto | null>(null);
  public currentSong$ = this.currentSongSubject.asObservable();

  constructor() { }

  playSong(song: SongDto) {
    this.currentSongSubject.next(song);
  }

  getSongUrl(song: SongDto): string {
    if (!song.filename) {
      console.error('Esta canción no tiene un archivo de audio (filename).');
      return '';
    }
    return `${this.API_URL}/music/${song.filename}`;
  }

  getCurrentSong(): SongDto | null {
    return this.currentSongSubject.getValue();
  }
}