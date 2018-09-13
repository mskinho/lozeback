import { Component, OnInit, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { TicketService } from '../../services/ticket.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Ticket } from '../../models/ticket';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

environment
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit, OnDestroy {
  tickets:Ticket[] = [];
  ticket:any = {};
  ticketToEdit:any = {};
  ticketToDelete:any = {};
  username;
  domain = environment.domain;
  private socket;
    ticketForm;
    sub: Subscription;
    user;
    profile;
    constructor(
        private ticketService:TicketService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private authService: AuthService,
    ) {

        this.createNewTicketForm();

    }
    ngOnInit(): void{

        this.ticketService.getTickets().subscribe(data => {
            this.tickets = data;

        this.socket = io(this.domain);
        // Receive Added Ticket
        this.sub = this.socket = this.ticketService.onTicket()
        .subscribe((ticket: Ticket) => {
           this.tickets.unshift(ticket);
          console.log(ticket);
        })
    });
    this.authService.getProfile().subscribe(profile => {
        this.profile = profile; // Used when creating new ticket posts and comments
        console.log(this.profile);
      });
   }
   ngOnDestroy() {
    this.sub.unsubscribe();
  }


        createNewTicketForm() {
            this.ticketForm = this.formBuilder.group({
              // Title field
              title: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.minLength(5)
              ])],
              // Body field
              body: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(500),
                Validators.minLength(5)
              ])]
            })
          }
    public sendTicket() {
        const ticket = {
            title: this.ticketForm.get('title').value, // Title field
            body: this.ticketForm.get('body').value, // Body field
            createdBy: this.user // CreatedBy field
          }
          this.ticketService.createTicket(ticket)

        this.ticketService.sendTicket(ticket).subscribe(data => {
        console.log(data);
            },
            error => {
              this.alertService.error(error.error.error?error.error.error:error.ticket);
            });
        this.ticketForm.reset();
      }


}
