import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { auth, User } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private pathParamState:BehaviorSubject<string> = new BehaviorSubject<string>('');
  pathParam: Observable<string>;

  private user: User;

  constructor(private afs: AngularFirestore,
              private afAuth: AngularFireAuth,
              private router: Router) { 
    this.pathParam = this.pathParamState.asObservable();
    this.afAuth.authState.subscribe( user  => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigateByUrl('').then();
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  loginWithGoogle(): void {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((data):void => {
      if (data.user) {
        this.user = data.user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigateByUrl('').then();
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  logout():void {
    this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login').then();
    });
  }

  updatePathParamState(newPathParam: string):void {
    this.pathParamState.next(newPathParam);
  }

  getUser(): User {
    return this.user;
  }
}

export interface RoomData {
  name: string;
  id?: string;
}
