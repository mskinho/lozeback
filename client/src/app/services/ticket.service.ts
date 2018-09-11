import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {Subject, BehaviorSubject, Observable, ConnectableObservable} from 'rxjs';
import { Observer } from 'rxjs/Observer';
import { Ticket } from "../models/ticket";
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { MessagingEvent } from '../models/messagingevent';
import { WebsocketService } from './websocket.service';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
    tickets: Subject<any>;
    options;
    domain = this.authService.domain;
    private socket;
  constructor(
      private http: HttpClient,
      private authService: AuthService,
      private socketService: WebsocketService
      ){
        this.socket = io(environment.domain);

}
// Function to create headers, add token, to be used in HTTP requests
createAuthenticationHeaders() {

    // Headers configuration options
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
  }
}
createTicket(ticket:any): void{
    this.socket.emit('addTicket', ticket);
  }
  public onTicket(): Observable<Ticket> {
    return new Observable<Ticket>(observer => {
        this.socket.on('ticket', (data) => observer.next(data));
        console.log('recebendo dados websocket')
    });
}
 sendTicket(ticket) {
      this.createAuthenticationHeaders(); // Create headers
    return this.http.post<any>(`${this.domain}/api/addTicket`,  ticket );
  }
 getTickets(){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get<any>(`${this.domain}/api/getTickets`)
    .map(data => {return data.tickets
    });
  }



}
