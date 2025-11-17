import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}