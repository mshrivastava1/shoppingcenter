import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor (private router: Router) {}
  sigunUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(
      error => console.log(error)
    );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(
      error => console.log(error)
    ).then(
      response => {
        firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => {
            this.token = token;
          }
        );
        this.router.navigate(['/recipes']);
      }
    );
  }

  getToke() {
    firebase.auth().currentUser.getIdToken()
    .then(
      (token: string) => {
        this.token = token;
      }
    )
    return this.token;
  }

  isAuthenticated () {
    return this.token != null;
  }

  logOut () {
    firebase.auth().signOut();
    this.token = null;
  }
}
