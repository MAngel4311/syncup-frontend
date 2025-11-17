import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SongDto {
  id: number;
  titulo: string;
  artista: string;
  genero: string;
  anio: number;
  duracion: number;
}

export interface UserDto {
  username: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class Song {

  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAvailableArtists(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/songs/artists`);
  }

  getAvailableGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/genres/master`);
  }

  getDiscoverWeekly(): Observable<SongDto[]> {
    return this.http.get<SongDto[]>(`${this.API_URL}/recommendations/discover-weekly`);
  }
  
  getUserSuggestions(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.API_URL}/users/suggestions`);
  }
}