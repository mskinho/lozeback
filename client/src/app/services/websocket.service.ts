import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Ticket } from '../models/ticket';
@Injectable()
export class WebsocketService {
    ticket;
  // Our socket connection
  private socket;
  constructor() { }

  connect(): Rx.Subject<MessageEvent> {

    //set environment
    this.socket = io(environment.domain);

    // We define our observable which will observe any incoming tickets
    // from our socket.io server.

    let observable = new Observable(observer => {
        this.socket.on('ticket', (data) => {
            this.ticket = data;
          console.log("Received ticket from Websocket Server", data)
        })

    });

    // We define our Observer which will listen to tickets
    // from our other components and send tickets back to our
    // socket server whenever the `next()` method is called.
    let observer = {  next: (data: Object) => {
            this.socket.emit('ticket', JSON.stringify(data));

        },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);
  }

}
