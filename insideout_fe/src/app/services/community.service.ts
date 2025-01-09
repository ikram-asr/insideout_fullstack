import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Backend API URL

  constructor(private http: HttpClient) {}

  addReaction(postId: string, userId: string, reactionType: string): Observable<any> {
    // Simple POST request without headers
    return this.http.post(`${this.apiUrl}/posts/${postId}/users/${userId}/reactions`, {
      type: reactionType,
    });
  }

  addComment(postId: string, userId: string, commentContent: string): Observable<any> {
    // Simple POST request without headers
    return this.http.post(`${this.apiUrl}/posts/${postId}/users/${userId}/comments`, {
      content: commentContent,
    });
  }


  addPost(userId: string, content: string, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
        formData.append('image', image);
    }

    return this.http.post(`${this.apiUrl}/users/${userId}/posts`, formData);
}

}
