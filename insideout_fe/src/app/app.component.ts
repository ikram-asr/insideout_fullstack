import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // Standalone component mode
  imports: [HttpClientModule, RouterModule, RouterOutlet], // Add forRoot(routes) to RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  message: string = ''; // Variable for displaying the API message

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getHello().subscribe({
      next: (response) => {
        this.message = response.message; // Store the returned message
      },
      error: (error) => {
        console.error('Error during API call:', error);
      },
    });
  }
}
