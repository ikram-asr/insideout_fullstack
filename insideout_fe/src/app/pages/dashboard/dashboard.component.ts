import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { CommonModule } from '@angular/common'; // Assurez-vous que c'est importé
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';  

@Component({
  selector: 'app-dashboard',
    imports: [RouterModule, FormsModule, CommonModule],
  
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('DashboardComponent initialized.');

    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log('Users fetched successfully:', response); // Debug log
        this.users = response; // Affecter les données récupérées
      },
      error: (error) => {
        console.error('Error fetching users:', error); // Debug log
        this.errorMessage = 'Erreur lors du chargement des utilisateurs.';
      }
    });
  }
}
