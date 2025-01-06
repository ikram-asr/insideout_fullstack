import { Component } from '@angular/core';

import { Router,RouterOutlet,RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [ RouterModule,FormsModule,CommonModule], 
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
