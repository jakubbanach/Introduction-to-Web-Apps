import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WalutaService } from './waluta.service';

@Injectable({
  providedIn: 'root'
})
export class KoszykService {
  kurs_waluty: number = 1;
  koszt: number = 0;
  ilosc_wycieczek: number = 0;
  private ile = new BehaviorSubject(this.koszt*this.kurs_waluty);
  getIlosc = this.ile.asObservable();

  private cena = new BehaviorSubject(this.ilosc_wycieczek);
  getCena = this.cena.asObservable();

  constructor(private walutaService:WalutaService) {
    this.walutaService.getWaluta.subscribe(wal => {
      this.koszt = +(this.koszt / this.kurs_waluty).toFixed(4);
      this.kurs_waluty = wal.kurs;
      this.koszt = +(this.koszt * this.kurs_waluty).toFixed(4);
    });
  }

  aktualizujIlosc(newIlosc: number) {
    this.ilosc_wycieczek+=newIlosc;
    this.ile.next(this.ilosc_wycieczek);
  }

  aktualizujCene(newCena: number) {
    this.koszt+=newCena;
    this.cena.next(this.koszt);
  }

  resetujKoszyk(){
    this.koszt = 0;
    this.ilosc_wycieczek = 0;
    this.ile.next(this.ilosc_wycieczek);
    this.cena.next(this.koszt);
  }
  // constructor() { }
}
