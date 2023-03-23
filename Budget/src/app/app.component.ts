import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'budget';
  ui: firebaseui.auth.AuthUI = {} as any;
  items: any[] = [];
  count: number = 0;
  userId: string = 'userUid';

  constructor(
    private afAuth: AngularFireAuth,
    private store: AngularFirestore
  ) {}

  ngOnDestroy(): void {
    this.ui.delete();
  }

  ngOnInit(): void {
    this.afAuth.app.then((app) => {
      const uiConfig = {
        signInOptions: [GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
          signInSuccessWithAuthResult: this.onLoginSuccess.bind(this),
        },
      };

      this.ui = new firebaseui.auth.AuthUI(app.auth());
      this.ui.start('#firebaseui-auth-container', uiConfig as any);
    });
    this.store
      .collection(`${this.store.firestore.app.auth().currentUser?.uid}`)
      .doc('items')
      .valueChanges()
      .subscribe((res) => console.log(res));
  }

  onLoginSuccess(result: any) {
    // this.userId = result.additionalUserInfo.profile.id;
    console.log(result.user.multiFactor.user.uid);
  }

  add() {
    this.count++;
    this.store
      .collection('data')
      .doc(`${this.userId}`)
      .set({ items: [this.count] });
  }
  addCat() {
    this.store
      .collection('data')
      .doc(`${this.userId}`)
      .update({ categories: ['cat1'] });
  }

  update() {
    this.store
      .collection('items')
      .doc(`${this.userId}`)
      .update({ items: [2, 3, 4] });
  }
}
