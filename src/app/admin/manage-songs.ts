import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AdminService } from '../services/admin.service';
import { SongDto } from '../services/song';

@Component({
  selector: 'app-manage-songs',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTooltipModule
  ],
  templateUrl: './manage-songs.html',
  styleUrl: './manage-songs.css'
})
export class ManageSongsComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  addSongForm: FormGroup;
  
  csvFile: File | null = null;
  isLoadingUpload = false;
  uploadResponse = '';
  uploadIsError = false;

  allSongs: SongDto[] = [];
  isLoadingList = true;
  editingSongId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.addSongForm = this.fb.group({
      titulo: ['', Validators.required],
      artista: ['', Validators.required],
      genero: ['', Validators.required],
      anio: [new Date().getFullYear(), Validators.required],
      duracion: [180, Validators.required],
      filename: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(): void {
    this.isLoadingList = true;
    this.adminService.getAllSongs().subscribe({
      next: (songs) => {
        this.allSongs = songs;
        this.isLoadingList = false;
      },
      error: (err) => {
        console.error('Error al cargar canciones:', err);
        this.isLoadingList = false;
      }
    });
  }

  onAddSongSubmit(): void {
    if (this.addSongForm.invalid) {
      return;
    }

    if (this.editingSongId) {
      this.adminService.updateSong(this.editingSongId, this.addSongForm.value).subscribe({
        next: (updatedSong) => {
          alert(`Canción '${updatedSong.titulo}' actualizada con éxito.`);
          this.cancelEdit();
          this.loadSongs();
        },
        error: (err) => alert('Error al actualizar canción: ' + err.message)
      });
    } else {
      this.adminService.addSong(this.addSongForm.value).subscribe({
        next: (newSong) => {
          alert(`Canción '${newSong.titulo}' añadida con éxito.`);
          this.addSongForm.reset();
          this.loadSongs();
        },
        error: (err) => alert('Error al añadir canción: ' + err.message)
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.csvFile = input.files[0];
      this.uploadResponse = '';
    }
  }

  onBulkUpload(): void {
    if (!this.csvFile) {
      alert('Por favor, selecciona un archivo CSV primero.');
      return;
    }

    this.isLoadingUpload = true;
    this.uploadResponse = '';
    this.uploadIsError = false;

    this.adminService.bulkUploadSongs(this.csvFile).subscribe({
      next: (response) => {
        this.isLoadingUpload = false;
        this.uploadResponse = response;
        this.uploadIsError = false;
        this.loadSongs();
      },
      error: (err) => {
        this.isLoadingUpload = false;
        this.uploadResponse = err.error ? err.error : 'Error desconocido al subir el archivo.';
        this.uploadIsError = true;
      }
    });
  }

  startEdit(song: SongDto): void {
    this.editingSongId = song.id;
    this.addSongForm.patchValue(song);
    this.tabGroup.selectedIndex = 0;
  }

  cancelEdit(): void {
    this.editingSongId = null;
    this.addSongForm.reset({
      anio: new Date().getFullYear(),
      duracion: 180
    });
  }

  onDeleteSong(song: SongDto): void {
    if (confirm(`¿Estás seguro de que quieres eliminar la canción '${song.titulo}'?`)) {
      this.adminService.deleteSong(song.id).subscribe({
        next: () => {
          this.allSongs = this.allSongs.filter(s => s.id !== song.id);
        },
        error: (err) => alert('Error al eliminar canción: ' + err.message)
      });
    }
  }
}