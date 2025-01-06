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
  errorMessage: string = '';

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.loadFriends();
  }

  loadFriends(): void {
    this.communityService.getFriends().subscribe(
      (data) => {
        this.friends = data; // On suppose que `data` contient la liste des amis et posts
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des amis';
        console.error('Erreur:', error);
      }
    );
  }
}