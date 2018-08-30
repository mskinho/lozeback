import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { CommentComponent } from './components/comment/comment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CondominioComponent } from './components/condominio/condominio.component';
import { HomeComponent } from './components/home/home.component';
import {MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatInputModule,
MatFormFieldModule } from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TicketComponent,
    CommentComponent,
    DashboardComponent,
    CondominioComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule

  ],
  providers: [AuthService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
