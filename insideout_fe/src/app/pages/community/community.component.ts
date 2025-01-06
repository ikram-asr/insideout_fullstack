import { Component } from '@angular/core';

import { Router,RouterOutlet,RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-community',
  imports: [ RouterModule,FormsModule,CommonModule], 
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent {

}
