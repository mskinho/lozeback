import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/find';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import 'rxjs/operator/filter';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    domain = environment.domain;
    authToken: any;
    user: any;
    options;
    constructor(
      private http: HttpClient
    ) {

    }

    // Function to create headers, add token, to be used in HTTP requests
    createAuthenticationHeaders() {
      this.loadToken(); // Get token so it can be attached to headers
      // Headers configuration options
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'authorization': this.authToken // Attach token
        })
  }
    }

    // Function to get token from client local storage
    loadToken() {
      const token = localStorage.getItem('id_token');
      this.authToken = token; // Get token and asssign to variable to be used elsewhere
    }

    // Function to register user accounts
    registerUser(user) {
      this.createAuthenticationHeaders(); // Create headers
      return this.http.post(this.domain + 'register', user);
    }

    // Function to check if username is taken
    checkUsername(username) {
      return this.http.get(this.domain + 'checkUsername/' + username);
    }

    // Function to check if e-mail is taken
    checkEmail(email) {
      return this.http.get(this.domain + 'checkEmail/' + email);
    }

    // Function to login user
    login(user) {
      return this.http.post(this.domain + 'login', user);
    }

    // Function to logout
    logout() {
      this.authToken = null; // Set token to null
      this.user = null; // Set user to null
      localStorage.clear(); // Clear local storage
    }

    // Function to store user's data in client local storage
    storeUserData(token, user) {
      localStorage.setItem('id_token', token); // Set token in local storage
      localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
      this.authToken = token; // Assign token to be used elsewhere
      this.user = user; // Set user to be used elsewhere
    }

    // Function to get user's profile data
    getProfile() {
      this.createAuthenticationHeaders(); // Create headers before sending to API
      return this.http.get(this.domain + 'profile', this.options);
    }
    getUsers(id) {
      this.createAuthenticationHeaders(); // Create headers before sending to API
      return this.http.get(this.domain + 'profile/' + id, this.options);
    }

    // Function to get public profile data
    getPublicProfile(username) {
      this.createAuthenticationHeaders(); // Create headers before sending to API
      return this.http.get(this.domain + 'publicProfile/' + username, this.options)
      ;
    }


    // Function to get all condominios from the database
    getAllCondominios() {
      this.createAuthenticationHeaders(); // Create headers
      return this.http.get(this.domain + 'allCondominios', this.options);
    }
    // Function to check if user is logged in
    loggedIn() {
      return tokenNotExpired('id_token');
    }
}
