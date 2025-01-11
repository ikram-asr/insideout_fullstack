import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';  

import { CommunityService } from '../../services/community.service';
import moment from 'moment';  


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
  commentContents: { [postId: string]: string } = {};  // Store comment content for each post
  selectedPostId: string | null = null;  // Stocke l'ID du post sélectionné

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,

   
        
        private communityService: CommunityService,

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
  
 

   // Add a reaction to a post
    addReaction(postId: string, type: string): void {
      this.communityService.addReaction(postId, this.userId, type).subscribe({
        next: (response) => {
          console.log('Reaction added', response);
          const post = this.friends.posts.find((p) => p.id === postId);
          if (post) {
            post.reactions.push({ userId: this.userId, type }); // Ajouter la réaction localement
          }
        },
        error: (error) => {
          console.error('Error adding reaction', error);
        }
      });
    }
    
  
    addComment(postId: string, content: string): void {
      if (content) {
        this.communityService.addComment(postId, this.userId, content).subscribe({
          next: (response) => {
            console.log('Comment added successfully:', response);
            const newComment = response.data; // Supposons que l'API retourne le nouveau commentaire
            const post = this.friends.posts.find((p) => p.id === postId);
            if (post) {
              post.comments.push(newComment); // Ajouter le commentaire à la liste locale
            }
            this.commentContents[postId] = ''; // Réinitialiser le champ de texte
          },
          error: (error) => {
            console.error('Error adding comment:', error);
          }
        });
      }
    }
    
  
    newPostContent: string = '';
    newPostImage: File | undefined = undefined; // Initialisé à undefined
    friends: { posts: any[] } = { posts: [] }; // Exemple de structure utilisateur
    
    // Gestion de l'image lors de la sélection
    onFileSelected(event: any): void {
      const file = event.target.files[0];
      this.newPostImage = file ? file : undefined; // Affecte undefined si aucun fichier
  }
    
  
  addPost(): void {
    const content = this.newPostContent;
    const image = this.newPostImage;
  
    if (!content) {
      console.error('Post content cannot be empty');
      return;
    }
  
    this.communityService.addPost(this.userId, content, image).subscribe({
      next: (response) => {
        console.log('Post created successfully', response);
        const newPost = response.data;
        this.friends.posts.unshift(newPost);
        console.log('Updated posts:', this.friends.posts); // Vérification
        this.newPostContent = '';
        this.newPostImage = undefined;
      },
      error: (error) => {
        console.error('Error creating post', error);
      }
    });
  }
  
  
  users: any[] = [];
  // Compter les commentaires pour un post
  countComments(post: any): number {
    let userComments = this.user.comments.filter((c: any) => c.post_id === post.id).length;
    let friendsComments = this.users.flatMap(friend => friend.comments || [])
                                     .filter((c: any) => c.post_id === post.id).length;
    return userComments + friendsComments;
  }
  
  // Compter les réactions par type
  countReactions(post: any, type: string): number {
    let userReactions = this.user.reactions.filter((r: any) => r.post_id === post.id && r.type === type).length;
    let friendsReactions = this.users.flatMap(friend => friend.reactions || [])
                                      .filter((r: any) => r.post_id === post.id && r.type === type).length;
    return userReactions + friendsReactions;
  }
  selectedPost: any = null;
  
  // Afficher une fenêtre modale avec les détails des commentaires
  openCommentsModal(post: any): void {
    this.selectedPostId = post.id; // Stocker l'ID du post sélectionné
    // Implémentez ici la logique pour ouvrir une pop-up
  }
  
  
  // Fermer la modale
  closeCommentsModal(): void {
    this.selectedPostId = null; // Réinitialise l'ID du post sélectionné
  }
  
  // Obtenir les commentaires pour un post spécifique
  getCommentsForPost(postId: string): any[] {
    // Récupérer les commentaires de l'utilisateur connecté
    const userComments = this.user.comments
      .filter((c: any) => c.post_id === postId)
      .map((c: any) => ({
        ...c,
        author: `${this.user.nom} ${this.user.prenom}`,
        profile: `${this.user.profile_image} `, // Nom et prénom de l'utilisateur connecté
      }));
  
    // Récupérer les commentaires des amis
    const friendsComments = this.users
      .flatMap(friend => friend.comments || [])
      .filter((c: any) => c.post_id === postId)
      .map((c: any) => {
        const author = this.users.find(u => u.id === c.user_id);
        return {
          ...c,
          author: author ? `${author.nom} ${author.prenom}` : 'Auteur inconnu',
          profile: `${this.user.profile_image} `,
        };
      });
  
    return [...userComments, ...friendsComments];
  }
  
  
  
  getTimeSince(dateString: string): string {
    const now = moment();
    const commentTime = moment(dateString);
    return commentTime.from(now); // Retourne une chaîne comme "il y a 2 heures"
  }
  
  goToFriendProfile(userId:string,friendId: string): void {
    this.router.navigate(['/profile', userId, friendId]);
  }


  dropdownOpen = false;

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

  
}
