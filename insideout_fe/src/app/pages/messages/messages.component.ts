import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  user: any = {};  // Utilisateur individuel
  errorMessage: string = '';
  userId: string = '';  // ID de l'utilisateur récupéré depuis l'URL
  users: any[] = [];
  friends: any[] = [];  // Liste des amis
  selectedFriendId: string = '';  // ID de l'ami sélectionné
  conversation: any[] = [];  // Conversation avec l'ami sélectionné
  newMessage: string = '';  // Le nouveau message que l'utilisateur tape


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
        this.friends = response.friends;  // Extraire la liste des amis de la réponse
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données utilisateur', error);
        this.errorMessage = 'Erreur lors de la récupération des données utilisateur.';
      }
    });
  }

  // Récupérer la conversation entre l'utilisateur et un ami sélectionné
  getConversation(friendId: string): void {
    // Vous devez appeler une API pour récupérer la conversation entre l'utilisateur et l'ami sélectionné
    this.userService.getConversation(this.userId, friendId).subscribe({
      next: (response) => {
        console.log('Conversation récupérée :', response);
        this.conversation = response;  // Affecter la conversation à l'array
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la conversation', error);
        this.errorMessage = 'Erreur lors de la récupération de la conversation.';
      }
    });
  }

  // Fonction pour sélectionner un ami et afficher la conversation
  selectFriend(friendId: string): void {
    this.selectedFriendId = friendId;
    this.getConversation(friendId);  // Récupérer la conversation
  }

 // Fonction pour envoyer un message
 sendMessage(): void {
  if (this.newMessage.trim() === '') {
    return;
  }

  const messageData = {
    sender_id: this.userId,
    receiver_id: this.selectedFriendId,
    content: this.newMessage,
  };

  this.userService.sendMessage(messageData).subscribe({
    next: (response) => {
      this.conversation.push(response.data);
      this.newMessage = '';
    },
    error: (error) => {
      console.error('Erreur lors de l\'envoi du message', error);
    }
  });
}

getFriendName(friendId: number): string {
  const friend = this.friends.find(f => f.id === friendId);
  return friend ? `${friend.prenom} ${friend.nom}` : 'Unknown';
}
}
