import { Component } from '@angular/core';

import { Router,RouterOutlet,RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  OnInit } from '@angular/core';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-community',
  imports: [ RouterModule,FormsModule,CommonModule], 
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent implements OnInit {
  friends: any[] = [];

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.loadFriendsDetails();
  }

  loadFriendsDetails(): void {
    this.communityService.getFriendsDetails().subscribe({
      next: (data) => {
        // Convertir les données de type objet en tableau pour l'affichage
        this.friends = Object.entries(data).map(([key, value]) => value);
        console.log(this.friends);
      },
      error: (err) => console.error('Failed to load friends details', err)
    });
  }
}