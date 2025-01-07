import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';  // Importation pour récupérer l'ID de l'URL
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = {};  // Utilisateur individuel
  errorMessage: string = '';
  userId: string = '';  // ID de l'utilisateur récupéré depuis l'URL
  users: any[] = [];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute  // Service pour récupérer les paramètres d'URL
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur depuis l'URL
    this.userId = this.route.snapshot.paramMap.get('id')!;
    console.log('ID utilisateur récupéré :', this.userId);

    // Vérifier que l'ID est valide avant de récupérer les données
    if (this.userId) {
      this.getUserData(this.userId); // Appeler la fonction pour récupérer les données utilisateur
    } else {
      this.errorMessage = 'ID utilisateur non valide';
    }
  }

  getUserData(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (response) => {
        console.log('Données utilisateur récupérées :', response);
        this.user = response;  // Affecter les données de l'utilisateur récupéré
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données utilisateur', error);
        this.errorMessage = 'Erreur lors de la récupération des données utilisateur.';
      }
    });
  }
}