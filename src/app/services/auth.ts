import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private readonly tokenKey = 'syncup-token';
  private readonly userNameKey = 'syncup-username';

  constructor(private http: HttpClient) {}

  checkUsername(username: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.API_URL}/check-username/${username}`);
  }
  
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          this.saveToken(response.token, response.nombre);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/register`, userData);
  }

  saveToken(token: string, name: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userNameKey, name);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserName(): string {
    return localStorage.getItem(this.userNameKey) || '';
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userNameKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}