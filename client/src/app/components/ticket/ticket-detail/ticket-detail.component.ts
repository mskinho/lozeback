import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../models/ticket';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
 @Input() comment: Comment;
 username;
 user;
 profile;
public ticket: Ticket;
  constructor(
    private location: Location,
    private ticketService: TicketService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private _router: Router
  ) { }
  getTicket(){
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      let comments = params['id'];

      this.ticketService.getTicket(id).subscribe(
        response => {
            this.ticket = response.ticket;
  })

    })
}
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
        this.profile = profile; // Used when creating new ticket posts and comments
        console.log(this.profile);
      });
      this.getTicket();
  }

}
