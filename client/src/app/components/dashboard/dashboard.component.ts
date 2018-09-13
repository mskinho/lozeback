import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    user;

    params: any;
    name = '';
   username = '';
    email = '';
    profile;
    constructor(
     private authService: AuthService,
     private route: ActivatedRoute, //allow you to get params
     private router: Router
    ) { }

    ngOnInit() {
      this.authService.getProfile().subscribe(profile => {
        this.profile = profile;
        console.log(this.profile)

      });

      this.route.params.subscribe((params: Params) => this.params= params);
    }

}
