import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { environment } from '../../environments/environment';
import {Subject, BehaviorSubject, Observable, ConnectableObservable} from 'rxjs';
import * as io from 'socket.io-client';
@Injectable()
export class CommentService {
    comments: Subject<any>;
    options;
  domain = this.authService.domain;
  private socket;
  constructor(
    private authService: AuthService,
    private http: Http
  ) {
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
  createComment(comment:any): void{
    this.socket.emit('addComment', comment);
  }
  public onComment() {
    let observable = new Observable(observer => {
          this.socket.on('comment', (data) => {
          observer.next(data);
        });

      })
      return observable;
    }

// Function to post a comment on a comment post
newComment(comment) {
  this.createAuthenticationHeaders(); // Create headers
  // Create commentData to pass to backend

  return this.http.post(this.domain + '/api/newComment', comment,  this.options).map(res => res.json());

}
getAllComments() {
  this.createAuthenticationHeaders(); // Create headers
  return this.http.get(this.domain + '/api/allComments', this.options).map(res => res.json());
}
}
