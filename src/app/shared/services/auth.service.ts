import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User | null>;
  
  constructor(private auth: AngularFireAuth) { 
    this.user$ = this.auth.authState;
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
   }

  async login(email: string, password: string) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  async getUserId(): Promise<string | null> {
    const user = await this.auth.currentUser;
    return user ? user.uid : null;
  }
  
}

