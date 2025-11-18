import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto, SongDto } from './song';

export interface ChartDataDto {
  label: string;
  value: number;
}

export interface AdminDashboardMetricsDto {
  totalUsuarios: number;
  totalCanciones: number;
  generoChartData: ChartDataDto[];
  artistaChartData: ChartDataDto[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly ADMIN_API_URL = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.ADMIN_API_URL}/users`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.ADMIN_API_URL}/users/${userId}`);
  }

  getAllSongs(): Observable<SongDto[]> {
    return this.http.get<SongDto[]>(`${this.ADMIN_API_URL}/songs`);
  }

  addSong(songData: any): Observable<SongDto> {
    return this.http.post<SongDto>(`${this.ADMIN_API_URL}/songs`, songData);
  }

  updateSong(songId: number, songData: any): Observable<SongDto> {
    return this.http.put<SongDto>(`${this.ADMIN_API_URL}/songs/${songId}`, songData);
  }

  deleteSong(songId: number): Observable<void> {
    return this.http.delete<void>(`${this.ADMIN_API_URL}/songs/${songId}`);
  }

  bulkUploadSongs(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.ADMIN_API_URL}/songs/bulk-upload`, formData, {
      responseType: 'text'
    });
  }

  getMetrics(): Observable<AdminDashboardMetricsDto> {
    return this.http.get<AdminDashboardMetricsDto>(`${this.ADMIN_API_URL}/metrics`);
  }
}