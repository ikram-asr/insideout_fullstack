// Exemple de service (src/app/services/notification.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de votre API Laravel

  constructor(private http: HttpClient) {}

  // Envoyer une notification
  sendNotification(senderId: string, receiverId: string, content: string): Observable<any> {
    const notificationData = { sender_id: senderId, receiver_id: receiverId, content: content };
    return this.http.post( `${this.apiUrl}/notifications`, notificationData);
  }

  // Récupérer les notifications de l'utilisateur
  getNotifications(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/notifications/${userId}`);
  }

 markAsRead(userId: string, friendId: string): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/notifications/mark-as-read/${userId}/${friendId}`, {});
}

  
}