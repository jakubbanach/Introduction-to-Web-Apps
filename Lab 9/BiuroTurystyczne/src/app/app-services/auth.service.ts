import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { first, firstValueFrom, Observable } from 'rxjs';
import { DaneService } from './dane.service';
import { Role, User } from '../app-interfaces/interfaceUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any = null;
  userRoles: Role = {
    gosc: true,
    klient: false,
    manager: false,
    admin: false,
    banned: false,
  };
  persistenceSetting: string = 'local';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private daneService: DaneService,
  ) {
    afAuth.authState.subscribe(async (ev: any) => {
      console.log("ROLE",this.userRoles);
      console.log(this.isLoggedIn());
      console.log(this.userData);
      if (ev) {
        this.userData = ev;
        const role = await this.daneService.getUserRoles(ev?.uid);
        this.userRoles = role as Role;
      } else {
        this.userData = null;
        this.userRoles = {
          gosc: true,
          klient: false,
          manager: false,
          admin: false,
          banned: false,
        };
      }
      console.log("ROLE",this.userRoles);
      // console.log("ROLE", this.userRoles);
      // console.log(this.isLoggedIn());
      // console.log(this.userData);
    });
  }

  async signInEmailPass(email: string, password: string) {
    return this.afAuth.setPersistence(this.persistenceSetting).then((_) => {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((ev) => {
          this.router.navigate(['wycieczki']);
        })
        .catch((err) => {
          window.alert(err.message);
        });
    });
  }

  async registerEmailPass(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        let userData = new User(res.user);
        this.daneService.dodajUsera(userData);
        this.router.navigate(['login']);
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  getCurrentUserData() {
    return this.afAuth.currentUser;
  }

  getAuthenticated(): Observable<any> {
    return this.afAuth.authState;
  }

  getUserFromEmail() {
    return this.userData.email.split('@')[0];
  }

  async signOut() {
    return this.afAuth.signOut().then((ev) => {
      // this.basket.basket = []
      this.router.navigate(['']);
    });
  }

  isLoggedIn() {
    console.log(this.userData);
    return this.userData != null;
  }

  changePersistence(newSetting: string) {
    this.persistenceSetting = newSetting;
  }
}