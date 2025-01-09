import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/users'; // Vérifiez cette URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    console.log('Calling API:', this.apiUrl);
    return this.http.get<any[]>(`http://127.0.0.1:8000/api/listusers`);
  }
    // Récupérer un utilisateur par ID
    getUserById(userId: string): Observable<any> {
      const token = localStorage.getItem('auth_token');
      const headers = { Authorization: `Bearer ${token}` };
      return this.http.get(`${this.apiUrl}/user/${userId}`, { headers });
    }

    getConversation(userId: string, friendId: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/conversations/${userId}/${friendId}`);
    }


      // Fonction pour envoyer un message
 // Fonction pour envoyer un message
 sendMessage(messageData: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/send-message`, messageData);
}
   
addFriend(friendshipData: any): Observable<any> {
  console.log('Sending friendship data:', friendshipData); // Add this log
  return this.http.post<any>(`${this.apiUrl}/friendships`, friendshipData);
}


}
