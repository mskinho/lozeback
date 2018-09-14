import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
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
MatFormFieldModule, MatSnackBarModule } from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { TicketDetailComponent } from './components/ticket/ticket-detail/ticket-detail.component';
import { TicketListComponent } from './components/ticket/ticket-list/ticket-list.component';
import { TicketService } from './services/ticket.service';
import { AlertService } from './services/alert.service';
import { WebsocketService } from './services/websocket.service';
import { TicketcommentComponent } from './components/ticket/ticketcomment/ticketcomment.component';
import { CommentService } from './services/comment.service';
import { TicketcommentPipe } from './components/ticket/ticketcomment.pipe';

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
    NavbarComponent,
    TicketDetailComponent,
    TicketListComponent,
    TicketcommentComponent,
    TicketcommentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule

  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, TicketService, AlertService, AuthService, WebsocketService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
