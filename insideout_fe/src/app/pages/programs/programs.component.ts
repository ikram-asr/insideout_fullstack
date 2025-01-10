import { Component,OnInit } from '@angular/core';

import { Router,RouterOutlet,RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';  
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-programs',
 
  imports: [ RouterModule,FormsModule,CommonModule], 
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent {

  user: any = {};  // Utilisateur individuel
  errorMessage: string = '';
  userId: string = '';  // ID de l'utilisateur récupéré depuis l'URL
  users: any[] = [];
  filteredUsers: any[] = [];  // Utilisateurs filtrés pour la recherche
  searchQuery: string = '';  // Texte de recherche
  followStatus: Record<string, string> = {};  // Ensure `friendId` can be a string key


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService : AuthService,
    private router: Router // Service pour récupérer les paramètres d'URL
  ) {}

  onLogout(): void {
    this.authService.logout().subscribe(() => {
      // Redirigez l'utilisateur vers la page de connexion ou une autre page
      this.router.navigate(['/']);
    }, error => {
      console.error('Erreur lors de la déconnexion', error);
    });
  }

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



 
  
  getFriendshipStatus(friendId: string): string | null {
    // Check if friendships exist
    if (!this.user.friendships) return null;
  
    // Find the friendship status for the given friendId (either user_id or friend_id)
    const friendship = this.user.friendships.find(
      (f: { user_id: string; friend_id: string; status: string }) => 
        (f.user_id === this.user.id && f.friend_id === friendId) || 
        (f.friend_id === this.user.id && f.user_id === friendId)
    );
  
    // Return the status if found, otherwise null
    return friendship ? friendship.status : null;
  }
  
  
  
  


  // Filtrer les utilisateurs en fonction de la recherche
 // Recherche d'utilisateurs
 onSearch(): void {
  const query = this.searchQuery.trim().toLowerCase();

  if (!query) {
    this.filteredUsers = []; // Pas de recherche, pas d'utilisateurs affichés
    return;
  }

  // Requête vers l'API pour récupérer les utilisateurs correspondant à la recherche
  this.userService.getUsers().subscribe({
    next: (response) => {
      this.filteredUsers = response.filter((user: any) => {
        const fullName = `${user.nom} ${user.prenom}`.toLowerCase();
        return fullName.includes(query);
      });
      console.log('Résultats de la recherche :', this.filteredUsers);
    },
    error: (error) => {
      console.error('Erreur lors de la recherche des utilisateurs', error);
    }
  });
}
isFollowing(userId: number): boolean {
  return !!this.followStatus[userId]; // Check if the user is in the followStatus map
}

  // Ajouter un ami
  followUser(friendId: string): void {
    const friendship = {
      userId: Number(this.user.id),  // Ensure it's an integer
      friendId: Number(friendId),    // Ensure it's an integer
      status: 'accepted',
    };
  
    this.followStatus[friendId] = 'Processing...'; // Show "Processing..." initially
  
    this.userService.addFriend(friendship).subscribe({
      next: (response) => {
        console.log('Ami ajouté avec succès', response);
        this.followStatus[friendId] = 'Following...'; // Set to "Following..." after success
      },
      error: (error) => {
        console.error('Erreur lors de l’ajout de l’ami', error);
        this.followStatus[friendId] = 'Failed to follow'; // Set to "Failed to follow" on error
      },
    });
  }
  
  
  

}
