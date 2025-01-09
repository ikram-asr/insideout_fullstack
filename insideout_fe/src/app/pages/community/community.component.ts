import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from '../../services/community.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-community',
  imports: [RouterModule, RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  user: any = {};  // Individual user
  errorMessage: string = '';
  userId: string = '';  // User ID from URL
  users: any[] = [];
  commentContents: { [postId: string]: string } = {};  // Store comment content for each post
  selectedPostId: string | null = null;  // Stocke l'ID du post sélectionné

  // Define mood styles
  moodStyles: any = {
    happy: { image: '/assets/images/joy-removebg-preview.png', background: 'bg-[#F4F3AC]' },
    anxious: { image: '/assets/images/anxiety-removebg-preview.png', background: 'bg-[#F4A84CA1]' },
    angry: { image: '/assets/images/angry-1.png', background: 'bg-[#FF46397D]' },
    sad: { image: '/assets/images/sad-removebg-preview.png', background: 'bg-[#3971FF7D]' },
    afraid: { image: '/assets/images/stress-removebg-preview.png', background: 'bg-[#9F86BAA3]' },
    bored: { image: '/assets/images/ennui-removebg-preview.png', background: 'bg-[#08095999]' },
    shy: { image: '/assets/images/shy.png', background: 'bg-[#EED7DF]' },
    default: { image: '/assets/images/joy-removebg-preview.png', background: 'bg-[#F4F3AC]' }
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
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

  // Function to get CSRF Token
  private getCSRFToken(): string {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  }

  // Function to prepare the headers for API requests

  // Add a reaction to a post
  addReaction(postId: string, type: string): void {
    this.communityService.addReaction(postId, this.userId, type).subscribe({
      next: (response) => {
        console.log('Reaction added', response);
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
          this.friends.posts.unshift(response.data); // Ajouter le nouveau post
          this.newPostContent = ''; // Réinitialiser le contenu
          this.newPostImage = undefined; // Réinitialiser l'image
      },
      error: (error) => {
          console.error('Error creating post', error);
      },
  });
}





  
}
