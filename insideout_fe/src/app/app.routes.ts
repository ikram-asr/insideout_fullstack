import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Qst1Component } from './pages/qst1/qst1.component';
import { Qst2Component } from './pages/qst2/qst2.component';
import { Qst3Component } from './pages/qst3/qst3.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { CommunityComponent } from './pages/community/community.component';
import { MessagesComponent } from './pages/messages/messages.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  
      { path: 'dashboard/:userId', component: DashboardComponent },
      { path: 'programs', component: ProgramsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'qst1', component: Qst1Component },
      { path: 'qst2', component: Qst2Component },
      { path: 'qst3', component: Qst3Component },
      { path: 'community/:userId', component: CommunityComponent },
      { path: 'messages', component: MessagesComponent },
    
  
];