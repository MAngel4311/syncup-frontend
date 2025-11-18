import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SongDto {
  id: number;
  titulo: string;
  artista: string;
  genero: string;
  anio: number;
  duracion: number;
  filename: string;
}

export interface UserDto {
  id: number;
  username: string;
  nombre: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class Song {

  private readonly API_URL = 'http://localhost:8080/api';
  private readonly USERS_API_URL = 'http://localhost:8080/api/users';

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
    return this.http.get<UserDto[]>(`${this.USERS_API_URL}/suggestions`);
  }

  autocomplete(prefix: string): Observable<string[]> {
    const params = new HttpParams().set('prefix', prefix);
    return this.http.get<string[]>(`${this.API_URL}/songs/autocomplete`, { params });
  }

  search(query: string): Observable<SongDto[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<SongDto[]>(`${this.API_URL}/songs/search`, { params });
  }

  getFavorites(): Observable<SongDto[]> {
    return this.http.get<SongDto[]>(`${this.USERS_API_URL}/me/favorites`);
  }

  exportFavorites(): Observable<Blob> {
    return this.http.get(`${this.USERS_API_URL}/me/favorites/export`, {
      responseType: 'blob'
    });
  }

  addFavorite(songId: number): Observable<SongDto[]> {
    return this.http.post<SongDto[]>(`${this.USERS_API_URL}/me/favorites/${songId}`, {});
  }

  removeFavorite(songId: number): Observable<SongDto[]> {
    return this.http.delete<SongDto[]>(`${this.USERS_API_URL}/me/favorites/${songId}`);
  }

  followUser(usernameToFollow: string): Observable<string> {
    return this.http.post(`${this.USERS_API_URL}/follow/${usernameToFollow}`, null, {
      responseType: 'text'
    });
  }

  searchUsers(query: string): Observable<UserDto[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<UserDto[]>(`${this.USERS_API_URL}/search`, { params });
  }

  getPublicProfile(username: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.USERS_API_URL}/profile/${username}`);
  }

  getPublicFavorites(username: string): Observable<SongDto[]> {
    return this.http.get<SongDto[]>(`${this.USERS_API_URL}/profile/${username}/favorites`);
  }
  
  startRadio(songId: number): Observable<SongDto[]> {
    return this.http.get<SongDto[]>(`${this.API_URL}/recommendations/radio/${songId}`);
  }
}