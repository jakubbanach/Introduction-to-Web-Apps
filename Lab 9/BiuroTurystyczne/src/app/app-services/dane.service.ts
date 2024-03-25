import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import * as daneWycieczek from '../wycieczki.json';
import { first, firstValueFrom, Observable, Subscription } from 'rxjs';
import { Trip } from '../app-interfaces/interfaceTrip';
import { Role, User } from '../app-interfaces/interfaceUser';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/trips';


@Injectable({
  providedIn: 'root'
})
export class DaneService {
  wycieczki: any[] = [];
  poczatkoweMiejsca: number[] = [];
  trips: Observable<any[]>;
  wycieczkiSub: Subscription | undefined;
  usingFirebase: boolean = true;
  private maxId: number = -1;


  constructor(private db: AngularFireDatabase, private http: HttpClient) {
    this.trips = db.list('trips').valueChanges();
  }

  getWycieczki(): Observable<any[]> {
    if (!this.usingFirebase) {
      return this.http.get<any[]>(baseUrl);
    }
    return this.db.list('trips').valueChanges();
  }

  getList(): any[] {
    this.wycieczkiSub = this.getWycieczki().subscribe((change) => {
      this.wycieczki = [];
      for (let trip of change) {
        this.wycieczki.push({
          id: trip.id,
          nazwa: trip.nazwa,
          docelowy_kraj: trip.docelowy_kraj,
          data_rozpoczecia: trip.data_rozpoczecia,
          data_zakonczenia: trip.data_zakonczenia,
          cena: trip.cena,
          miejsca: trip.miejsca,
          opis: trip.opis,
          zdjecie: trip.zdjecie,
        } as Trip);
        this.poczatkoweMiejsca.push(trip.miejsca);
      }
      return this.wycieczki;
    });
    return this.wycieczki;
  }

  async getMaxId(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.wycieczkiSub = this.getWycieczki().subscribe((change) => {
        this.maxId = -1;
        for (let trip of change) {
          if (trip.id > this.maxId) {
            this.maxId = trip.id;
          }
        }
        this.maxId += 1;
        resolve(this.maxId);
      }, (error) => {
        reject(error);
      });
    });
  }
  
  getWycieczka(id: number): Observable<any> {
    if (!this.usingFirebase) {
      return this.http.get<any>(`${baseUrl}/${id}`);
    }
    return this.db.object('trips' + id).valueChanges();
  }

  async addWycieczka(trip: Trip) {
    const newId = await this.getMaxId();
    trip.id = newId;
    if (!this.usingFirebase) {
      this.http.post(baseUrl, trip).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    }
    else {
      console.log("THIS", trip.id);
      this.db.list('trips').set(String(trip.id), trip);
    }
  }

  updateTrip(trip: Trip) {
    if (!this.usingFirebase) {
      console.log("PUT", trip.id);
      // console.log(this.http.put(`${baseUrl}/${trip.id}`, trip));
      this.http.put(`${baseUrl}/${trip.id}`, trip).subscribe({
        next: (res) => {
          console.log(res);
          // this.dodane = true;
        },
        error: (e) => console.error(e)
      });
    }
    else {
      this.db.object('trips/' + trip.id).update(trip);
    }
  }

  deleteTrip(id: number) {
    if (!this.usingFirebase) {
      // console.log(this.http.delete(`${baseUrl}/${id}`));
      this.http.delete(`${baseUrl}/${id}`).subscribe({
        next: (res) => {
          console.log(res);
          // this.dodane = true;
        },
        error: (e) => console.error(e)
      });
    }
    else {
      console.log("ID ", id);
      this.db.list('trips').remove(String(id));
    }
  }

  //nieuzywane
  changeDataSource(changing: String) {
    if (changing === 'FIREBASE') {
      this.usingFirebase = true;
    }
    else {
      this.usingFirebase = false;
    }
    console.log(this.usingFirebase);
    // this.usingFirebase = changing;
    this.getWycieczki();
  }

  dodajUsera(user: User) {
    this.db.object('/users/' + user.password).set({
      email: user.email,
      role: user.role,
      // password: user.password
    });
  }

  async getUserRoles(username: string) {
    return firstValueFrom(
      this.db.object('/users/' + username + '/role').valueChanges()
    );
  }

  getUserRoles$(username: string) {
    return this.db.object('/users/' + username + '/role').valueChanges();
  }

  getUsers() {
    return this.db.list('users').snapshotChanges();
  }

  changeUserRole(username: string, role: string, value: string) {
    let change = '{"' + role + '"' + ':' + value + '}';
    this.db.object('/users/' + username + '/role').update(JSON.parse(change));
  }

  // deleteUser(username: string) {
  //   this.db.object('/users/' + username).remove();
  // }

  // getPoczatkoweMiejsca() {
  //   this.trips.subscribe((data) => {
  //     this.poczatkoweMiejsca=[];
  //     data.forEach(wycieczka => {
  //       this.poczatkoweMiejsca.push(wycieczka.miejsca);
  //     });
  //     console.log(this.poczatkoweMiejsca);
  //   });
  //   return this.poczatkoweMiejsca;
  // }
}
