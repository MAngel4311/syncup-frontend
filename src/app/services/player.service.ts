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
  
  private queueSubject = new BehaviorSubject<SongDto[]>([]);
  public queue$ = this.queueSubject.asObservable();

  private historySubject = new BehaviorSubject<SongDto[]>([]);
  public history$ = this.historySubject.asObservable();

  constructor() { }
  
  private playAndManageHistory(song: SongDto): void {
      const current = this.currentSongSubject.getValue();
      if (current) {
          const history = this.historySubject.getValue();
          this.historySubject.next([...history, current]);
      }
      this.currentSongSubject.next(song);
  }

  playSong(song: SongDto) {
    this.historySubject.next([]);
    this.queueSubject.next([]);
    this.playAndManageHistory(song);
  }

  playQueue(queue: SongDto[]) {
    if (queue && queue.length > 0) {
      const [firstSong, ...restOfQueue] = queue;
      this.historySubject.next([]);
      this.queueSubject.next(restOfQueue);
      this.playAndManageHistory(firstSong);
    }
  }

  playNext(): void {
    const queue = this.queueSubject.getValue();
    if (queue.length > 0) {
      const [nextSong, ...restOfQueue] = queue;
      this.queueSubject.next(restOfQueue);
      this.playAndManageHistory(nextSong);
    } else {
      this.currentSongSubject.next(null);
    }
  }

  playPrevious(): void {
    const history = this.historySubject.getValue();
    if (history.length > 0) {
        const previousSong = history[history.length - 1];
        const restOfHistory = history.slice(0, -1);
        
        const currentSong = this.currentSongSubject.getValue();
        if (currentSong) {
            const queue = this.queueSubject.getValue();
            this.queueSubject.next([currentSong, ...queue]);
        }

        this.historySubject.next(restOfHistory);
        this.currentSongSubject.next(previousSong);
    }
  }
  
  // --- MÉTODO AÑADIDO ---
  public getHistoryValue(): SongDto[] {
      return this.historySubject.getValue();
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