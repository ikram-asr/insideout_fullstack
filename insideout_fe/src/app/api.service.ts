import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Fournit le service à l'ensemble de l'application
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api/hello'; // URL de l'API Laravel

  constructor(private http: HttpClient) {}

  getHello(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`${this.apiUrl}`);
  }
}
