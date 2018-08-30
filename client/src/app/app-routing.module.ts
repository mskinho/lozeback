import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { NotAuthGuard } from './guards/notAuth.guard';
import { AuthGuard } from './guards/auth.guard';

//Routes
const appRoutes: Routes = [
    {
      path: '',
      component: HomeComponent // Default Route
    },
    {
      path: 'dashboard',
      component: DashboardComponent, // Dashboard Route,
      canActivate: [AuthGuard] // User must be logged in to view this route
    },
    {
      path: 'register',
      component: RegisterComponent, // Register Route
      canActivate: [AuthGuard] // User must be logged in to view this route
    },
    {
      path: 'login',
      component: LoginComponent, // Login Route
      canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
    },

    {
      path: 'ticket',
      component: TicketComponent, // Ticket Route,
      canActivate: [AuthGuard] // User must be logged in to view this route
    },
    { path: '**', component: HomeComponent } // "Catch-All" Route
  ];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
