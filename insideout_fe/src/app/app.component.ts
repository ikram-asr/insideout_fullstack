import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true, // Mode autonome
  imports: [HttpClientModule], // Ajoutez HttpClientModule ici
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  message: string = ''; // Variable pour afficher le message de l'API

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getHello().subscribe({
      next: (response) => {
        this.message = response.message; // Stocke le message retourné
      },
      error: (error) => {
        console.error('Erreur lors de l\'appel API :', error);
      },
    });
  }
}
