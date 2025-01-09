import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EtatService {
  private apiUrl = 'http://127.0.0.1:8000/api/etat'; // Change selon ton URL d'API

  constructor(private http: HttpClient) { }


  // Sauvegarde temporaire dans le localStorage
  saveToLocalStorage(key: string, value: any): void {
    const existingData = JSON.parse(localStorage.getItem('etatData') || '{}');
    existingData[key] = value;
    localStorage.setItem('etatData', JSON.stringify(existingData));
  }

  // Récupérer les réponses depuis le localStorage
  getFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem('etatData') || '{}');
  }

  // Effacer les réponses du localStorage
  clearLocalStorage(): void {
    localStorage.removeItem('etatData');
  }

  // Envoyer toutes les réponses à Laravel
 /* saveEtat(data: any): Observable<any> {
    const csrfToken = this.getCSRFToken(); // Récupère le jeton CSRF

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken // Ajoute le jeton CSRF dans les en-têtes
    });

    return this.http.post(this.apiUrl, data, { headers });
  }



  private getCSRFToken(): string {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return token || '';
  }*/
    saveEtat(userId: number, etatData: any): Observable<any> {
      const csrfToken = this.getCSRFToken(); // Récupère le jeton CSRF
    
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken // Ajoute le jeton CSRF dans les en-têtes
      });
    
      // Crée un objet de données qui contient l'ID de l'utilisateur, les valeurs de localStorage (maintenant passées via etatData), et la date du système
      const data = {
        user_id: userId,
        sleep_quality: etatData.sleep_quality || null, // Si la réponse n'existe pas dans les données, elle sera définie sur null
        sleep_hours: etatData.sleep_hours || null,
        sleep_minutes: etatData.sleep_minutes || null,
        mood: etatData.mood || null,
        date: new Date().toISOString().split('T')[0] // Date du système, formatée au format 'YYYY-MM-DD'
      };
    
      console.log("Sending data to the server:", data);
    
      // Envoie les données à l'API via une requête POST
      return this.http.post(this.apiUrl, data, { headers });
    }
    
    
    private getCSRFToken(): string {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      return token || '';
    }
    




 /* saveEtat(userId: number, sleepQuality: string): Observable<any> {
    const csrfToken = this.getCSRFToken();  // Récupère le jeton CSRF
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken  // Ajoute le jeton CSRF dans les en-têtes
    });

    const data = {
      user_id: userId,
      sleep_quality: sleepQuality,
      sleep_hours: null,
      study_hours: null,
      mood: null,
      date: new Date().toISOString().split('T')[0]
    };

    console.log("Sending data to the server:", { userId, sleepQuality });

    return this.http.post(this.apiUrl, data, { headers });
  }

  private getCSRFToken(): string {
    // Récupère le jeton CSRF depuis la balise meta dans le DOM
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return token || '';
  }


  //fonction qst2

  saveMood(userId: number, mood: string): Observable<any> {
    const csrfToken = this.getCSRFToken();  // Récupère le jeton CSRF
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken  // Ajoute le jeton CSRF dans les en-têtes
    });
  
    const data = {
      user_id: userId,
      mood: mood,
      date: new Date().toISOString().split('T')[0]  // Utilise la date du jour
    };
  
    console.log("Sending mood data to the server:", { userId, mood });
  
    return this.http.post('http://127.0.0.1:8000/api/etat/mood', data, { headers });
  }*/
  
  
}
