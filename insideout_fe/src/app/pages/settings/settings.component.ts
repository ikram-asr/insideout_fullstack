import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';  
import { AuthService } from '../../services/authService/auth.service';
@Component({
  selector: 'app-settings',
  imports: [ RouterModule, FormsModule, CommonModule], 
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: any = {}; // Informations utilisateur connecté
  errorMessage: string = '';
  userId: string = ''; // ID de l'utilisateur
  friendList: any[] = []; // Liste des amis
  showFriendPopup: boolean = false; // État de la pop-up
  postCount: number = 0; // Nombre de posts
  friendCount: number = 0; // Nombre d'amis
  selectedFile: File | null = null; // Ajout de la propriété selectedFile

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    if (this.userId) {
      this.getUserData(this.userId);
    } else {
      this.errorMessage = 'ID utilisateur non valide';
    }
  }
  onLogout(): void {
    this.authService.logout().subscribe(() => {
      // Redirigez l'utilisateur vers la page de connexion ou une autre page
      this.router.navigate(['/']);
    }, error => {
      console.error('Erreur lors de la déconnexion', error);
    });
  }


  // Récupérer les données utilisateur
  getUserData(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (response) => {
        this.user = response;
        this.user.nom_old = response.nom;
        this.user.prenom_old = response.prenom;
        this.user.email_old = response.email;
  
        this.postCount = response.posts.length; // Nombre de posts
        this.friendCount = response.friendships.length; // Nombre d'amis
        this.friendList = response.friends; // Charger la liste des amis
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des données utilisateur.';
      }
    });
  }

  // Afficher/masquer la pop-up des amis
  toggleFriendPopup(): void {
    this.showFriendPopup = !this.showFriendPopup;
  }

  // Supprimer un ami
  removeFriend(friendId: string): void {
    if (!this.userId) {
      console.error('L\'ID de l\'utilisateur est manquant.');
      return;
    }
  
    this.userService.removeFriend(this.userId, friendId).subscribe({
      next: () => {
        this.friendList = this.friendList.filter(friend => friend.id !== friendId);
        this.friendCount--; // Réduire le nombre d'amis
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l’ami', error);
      }
    });
  }

  editMode = false;

  // Mettre à jour les informations utilisateur
  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  updateUser() {
    const userData = {
      nom: this.user.nom || this.user.nom_old ,
      prenom: this.user.prenom || this.user.prenom_old ,
      email: this.user.email || this.user.email_old ,
      profile_image: this.user.profile_image // Image en base64 si nécessaire
    };
  // Vérification de l'URL de l'image avant de la mettre à jour
  console.log(`Image URL: http://127.0.0.1:8000/uploads/${this.user.profile_image}`);

  

    this.userService.updateUser(this.user.id, userData).subscribe({
      next: (response) => {
        console.log('Utilisateur mis à jour avec succès', response);
        this.toggleEditMode();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de l’utilisateur', err);
        if (err.status === 422) {
          console.error('Détails des erreurs de validation :', err.error.errors);
        }
        this.errorMessage = 'Erreur lors de la mise à jour de l’utilisateur';
      },
    });
  }
  
  
  
  sendUpdateRequest() {
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (response) => {
        console.log('Utilisateur mis à jour avec succès', response);
        this.toggleEditMode();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de l’utilisateur', err);
        this.errorMessage = 'Erreur lors de la mise à jour de l’utilisateur';
      },
    });
  }
  
  // Fonction pour gérer le fichier sélectionné
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Mettre à jour la variable selectedFile
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profile_image = e.target.result; // Mise à jour de l'aperçu de l'image
      };
      reader.readAsDataURL(file);
    }
  }
  
}
