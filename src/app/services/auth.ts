import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // Misión 2: Verifica si el username (email) ya existe en la BD
  checkUsername(username: string): Observable<{ exists: boolean }> {
    // Llama al endpoint GET /api/auth/check-username/{username}
    return this.http.get<{ exists: boolean }>(`${this.API_URL}/check-username/${username}`);
  }
  
  // Esqueleto para Login (RF-001)
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, credentials);
  }

  // Esqueleto para Registro (Misión 2)
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/register`, userData);
  }
}