import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute, Router} from '@angular/router';
import { CommunityService } from '../../services/community.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import moment from 'moment';  // Installer Moment.js : `npm install moment`
import { AuthService } from '../../services/authService/auth.service';


@Component({
  selector: 'app-profile',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {}; 
  friendId: string = '';
  friendData: any = {};
  userId: string = '';  // User ID from URL
  users: any[] = [];
  commentContents: { [postId: string]: string } = {};  // Store comment content for each post
  selectedPostId: string | null = null;  // Stocke l'ID du post sélectionné
  errorMessage: string = '';


  constructor(
      private userService: UserService,
        private route: ActivatedRoute,
        private communityService: CommunityService,
        private http: HttpClient,
        private cdr: ChangeDetectorRef,
        private authService: AuthService,
        private router: Router // Injection de ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.friendId = this.route.snapshot.paramMap.get('idfriend')!;
    this.loadFriendData();
    // Get user ID from URL
    this.userId = this.route.snapshot.paramMap.get('id')!;
    console.log('User ID retrieved:', this.userId);

    if (this.userId) {
      this.getUserData(this.userId);
    } else {
      this.errorMessage = 'Invalid user ID';
    }
    
  }
  getUserData(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (response) => {
        console.log('User data retrieved:', response);
        this.user = response;
        this.users = response.friends || [];
      },
      error: (error) => {
        console.error('Error fetching user data', error);
        this.errorMessage = 'Error fetching user data.';
      }
    });
  }

  
 
  onLogout(): void {
    this.authService.logout().subscribe(() => {
      // Redirigez l'utilisateur vers la page de connexion ou une autre page
      this.router.navigate(['/']);
    }, error => {
      console.error('Erreur lors de la déconnexion', error);
    });
  }

  loadFriendData(): void {
    this.userService.getUserById(this.friendId).subscribe({
      next: (response) => {
        this.friendData = response;
      },
      error: (error) => {
        console.error('Error loading friend data', error);
      }
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
  getCommentsForPost(postId: string | null): any[] {
    if (!postId) return [];  // Return an empty array if postId is null
  
    const userComments = this.user.comments
      .filter((c: any) => c.post_id === postId)
      .map((c: any) => ({
        ...c,
        author: `${this.user.nom} ${this.user.prenom}`,
        profile: `${this.user.profile_image}`,
      }));
  
    const friendsComments = this.users
      .flatMap(friend => friend.comments || [])
      .filter((c: any) => c.post_id === postId)
      .map((c: any) => {
        const author = this.users.find(u => u.id === c.user_id);
        return {
          ...c,
          author: author ? `${author.nom} ${author.prenom}` : 'Auteur inconnu',
          profile: `${this.user.profile_image}`,
        };
      });
  
    return [...userComments, ...friendsComments];
  }
  
  
  
  
  getTimeSince(dateString: string): string {
    const now = moment();
    const commentTime = moment(dateString);
    return commentTime.from(now); // Retourne une chaîne comme "il y a 2 heures"
  }
  
  // Define mood styles
  moodStyles: any = {
    happy: { image: '/assets/images/joy-removebg-preview.png', background: 'bg-[#F4F3AC]' },
    anxious: { image: '/assets/images/anxiety-removebg-preview.png', background: 'bg-[#F4A84CA1]' },
    angry: { image: '/assets/images/anger-removebg-preview.png', background: 'bg-[#FF46397D]' },
    sad: { image: '/assets/images/sad-removebg-preview.png', background: 'bg-[#3971FF7D]' },
    afraid: { image: '/assets/images/stress-removebg-preview.png', background: 'bg-[#9F86BAA3]' },
    bored: { image: '/assets/images/ennui-removebg-preview.png', background: 'bg-[#08095999]' },
    shy: { image: '/assets/images/shy.png', background: 'bg-[#EED7DF]' },
    default: { image: '/assets/images/joy-removebg-preview.png', background: 'bg-[#F4F3AC]' }
  };
  // In your component class


  
  // Supprimer un ami
removeFriend(friendId: string): void {
  if (!this.userId) {
    console.error('L\'ID de l\'utilisateur est manquant.');
    return;
  }

  // Confirm before removing the friend
  if (confirm('Do you want to unfollow this friend ?')) {
    this.userService.removeFriend(this.userId, friendId).subscribe({
      next: () => {
        // If there is no list, just handle the UI logic here
        // For example, you can reset the profile data or navigate back to the user's profile page
        this.friendData = null; // Assuming the friend data is cleared after removal
        alert('You are no longer friends :(');
      },
      error: (error) => {
        console.error('Erreur , this is a sign to not unfollow this friend', error);
      }
    });
  }
}

dropdownOpen = false;

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}
}
