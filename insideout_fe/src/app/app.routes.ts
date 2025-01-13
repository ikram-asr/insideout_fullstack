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
import { ProfileComponent } from './pages/profile/profile.component';
import { RealprogrammsComponent } from './realprogramms/realprogramms.component';
import { AuthGuard } from './auth.guard'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'programsuggestion/:id', component: RealprogrammsComponent,canActivate: [AuthGuard]  },

      { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard]  },
      { path: 'programs/:id', component: ProgramsComponent,canActivate: [AuthGuard]  },
      { path: 'settings/:id', component: SettingsComponent,canActivate: [AuthGuard]  },
      { path: 'qst1/:id', component: Qst1Component,canActivate: [AuthGuard]  },
      { path: 'qst2/:id', component: Qst2Component,canActivate: [AuthGuard]  },
      { path: 'qst3/:id', component: Qst3Component, canActivate: [AuthGuard]  },
      { path: 'community/:id', component: CommunityComponent, canActivate: [AuthGuard]  },
      { path: 'messages/:id', component: MessagesComponent, canActivate: [AuthGuard]  },
      { path: 'profile/:id/:idfriend', component: ProfileComponent, canActivate: [AuthGuard]  },
    
  
];