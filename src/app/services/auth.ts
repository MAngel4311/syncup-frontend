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
  private readonly onboardingKey = 'syncup-onboarding-status';

  constructor(private http: HttpClient) {}

  checkUsername(username: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.API_URL}/check-username/${username}`);
  }
  
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          this.saveToken(response.token, response.nombre, response.haCompletadoOnboarding);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/register`, userData);
  }

  saveToken(token: string, name: string, onboardingStatus: boolean): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userNameKey, name);
    localStorage.setItem(this.onboardingKey, String(onboardingStatus));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserName(): string {
    return localStorage.getItem(this.userNameKey) || '';
  }

  hasCompletedOnboarding(): boolean {
    return localStorage.getItem(this.onboardingKey) === 'true';
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.onboardingKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  completeOnboarding(artistas: string[], generos: string[]): Observable<void> {
    const request = { artistas, generos };
    const usersApiUrl = this.API_URL.replace('/auth', '/users');
    return this.http.post<void>(`${usersApiUrl}/me/onboarding`, request);
  }

  updateOnboardingStatus(status: boolean): void {
    localStorage.setItem(this.onboardingKey, String(status));
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (e) {
      return null;
    }
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decoded = this.decodeToken(token);
    return decoded ? decoded.rol : null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
}