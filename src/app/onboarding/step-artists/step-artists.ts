import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-step-artists',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './step-artists.html',
  styleUrl: './step-artists.css'
})
export class StepArtists implements OnInit {

  @Output() formValidity = new EventEmitter<boolean>();
  @Output() selectionChange = new EventEmitter<Set<string>>();

  allArtists: string[] = [];
  displayArtists: string[] = [];
  selectedArtists: Set<string> = new Set();
  
  private _filterText: string = '';
  get filterText(): string {
    return this._filterText;
  }
  set filterText(value: string) {
    this._filterText = value;
    this.updateDisplayArtists();
  }
  
  constructor() {} 

  ngOnInit(): void {
    const artistsFromAssets = [
      'Maluma',
      'Shakira',
      'Feid',
      'Karol G',
      'Jorge Celedon',
      'Jose Andrea',
      'Michael Jackson',
      'Lana del rey',
      'Saga Kastronovo',
      'Blessd',
      'Ricardo Arjona',
      'Pipe Pelaez',
      '2Pac',
      'Bad Bunny',
      'Chichi Peralta',
      'De La Rose',
      'Julio Jaramillo',
      'Justin Bieber',
      'Kapo',
      'Milo j',
      'Mora',
      'Omar Courtz',
      'Penyair',
      'Romeo Santos',
      'The Weeknd',
      'Trueno',
      'Vilma Palma E Vampiros'
    ];

    this.allArtists = artistsFromAssets;
    this.updateDisplayArtists();
  }

  updateDisplayArtists(): void {
    if (this.filterText) {
      this.displayArtists = this.allArtists.filter(artist => 
        artist.toLowerCase().includes(this.filterText.toLowerCase())
      );
    } else {
      this.displayArtists = this.allArtists.slice(0, 9);
    }
  }

  toggleArtist(artist: string): void {
    if (this.selectedArtists.has(artist)) {
      this.selectedArtists.delete(artist);
    } else {
      if (this.selectedArtists.size < 3) {
        this.selectedArtists.add(artist);
      }
    }
    this.checkValidity();
    this.selectionChange.emit(this.selectedArtists);
  }

  checkValidity(): void {
    const isValid = this.selectedArtists.size === 3;
    this.formValidity.emit(isValid);
  }

  isSelected(artist: string): boolean {
    return this.selectedArtists.has(artist);
  }

  getImagePath(artist: string): string {
    return `assets/images/artists/${artist}.jpg`;
  }
}