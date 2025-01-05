import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // Import du routeur
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Import des routes définies

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Fournir HttpClient pour les appels API
    provideRouter(routes), // Fournir les routes pour le routage
  ],
}).catch((err) => console.error(err));
