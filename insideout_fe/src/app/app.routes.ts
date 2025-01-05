import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Qst1Component } from './qst1/qst1.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    //{ path: '', component: AppComponent },
    {path: 'signup', component: SignupComponent},
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'qst1', component: Qst1Component},

];
