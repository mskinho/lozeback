import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Subject, BehaviorSubject, Observable, ConnectableObservable} from 'rxjs';
import { Observer } from 'rxjs/Observer';
import { Ticket } from "../models/ticket";
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
    tickets: Subject<any>;
    options;
    domain = this.authService.domain;
    private socket;
    authToken: any;
  constructor(
      private http: Http,
      private authService: AuthService,

      ){
        this.socket = io(environment.domain);

}
 // Function to create headers, add token, to be used in HTTP requests
 createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }
createTicket(ticket:any): void{
    this.socket.emit('addTicket', ticket);
  }
  public onTicket() {
    let observable = new Observable(observer => {
          this.socket.on('ticket', (data) => {
          observer.next(data);
        });

      })
      return observable;
    }
 sendTicket(ticket) {
      this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain +'/api/addTicket',  ticket,  this.options ).map(res => res.json());
  }
  getTicket(id: string){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/api/oneTicket/' + id, this.options).map(res => res.json());
  }
 getTickets(){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain+'/api/getTickets',  this.options).map(res => res.json());
  }



}
