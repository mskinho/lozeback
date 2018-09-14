import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../models/comment';
import { AuthService } from './../../../services/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Ticket } from '../../../models/ticket';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../../../environments/environment';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-ticketcomment',
  templateUrl: './ticketcomment.component.html',
  styleUrls: ['./ticketcomment.component.css']
})
export class TicketcommentComponent implements OnInit, OnDestroy {
    @Input()ticket: Ticket;
   comments: Comment [] = [];
   comment:any = {};
   form;
   commentForm;
   username;
   profile;
   user;
   sub: Subscription;
   domain = environment.domain;
  private socket;
   constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private commentService: CommentService,
    public snackbar: MatSnackBar
  ) {
    this.createNewCommentForm();
  }
  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile => {
        this.profile = profile; // Used when creating new comment posts and comments
    });
    this.commentService.getAllComments().subscribe(data => {
        this.comments = data.comments;
        console.log(data);

    this.socket = io(this.domain);
    // Receive Added Comment
    this.sub = this.socket = this.commentService.onComment()
    .subscribe((comment: Comment) => {
       this.comments.unshift(comment);
      console.log(comment);
    })
});
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  //create reactive form
  createNewCommentForm() {
    this.commentForm = this.formBuilder.group({
    content: ['']
    })
  }
  //send form
 public save(){
    const comment = {
      content: this.commentForm.get('content').value,
      createdBy: this.profile.user.username,
      ticketId: this.ticket._id
    }
    this.commentService.createComment(comment)
    this.commentService.newComment(comment).subscribe(data => {
      // Check if comment was saved to database or not
      if (!data) {
     this.snackbar.open('Erro ao criar menssagem', 'Undo', {
     duration: 3000
          });
      } else {

        this.snackbar.open('mensagem criada com sucesso', 'Undo', {
            duration: 3000
          });

        setTimeout(() => {
        this.commentForm.reset(); // Reset all form fields
        }, 1000);
        // Clear form data after two seconds

      }
    });
  }


}
