import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
    { path: '', component: AppComponent },
    {path: 'signup', component: SignupComponent},
    //{ path: '', redirectTo: 'signup', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},

];
