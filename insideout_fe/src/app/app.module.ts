import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';  // Ensure SidebarComponent is imported here
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CommunityComponent } from './pages/community/community.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Qst1Component } from './pages/qst1/qst1.component';
import { Qst2Component } from './pages/qst2/qst2.component';
import { Qst3Component } from './pages/qst3/qst3.component';
import { routes } from './app.routes';  // Ensure routes are correctly imported

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,  // Declare SidebarComponent here
    DashboardComponent,
    ProgramsComponent,
    SettingsComponent,
    CommunityComponent,
    LoginComponent,
    SignupComponent,
    Qst1Component,
    Qst2Component,
    Qst3Component,
    // other components
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),  // Import RouterModule for routing
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Add this line
})
export class AppModule { }
