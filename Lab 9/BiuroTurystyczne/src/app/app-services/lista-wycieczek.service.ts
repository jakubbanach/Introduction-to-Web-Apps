import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface WycieczkaItem {
  id: number;
  ilosc: number;
}

@Injectable({
  providedIn: 'root'
})
export class ListaWycieczekService  {
  private wycieczki: WycieczkaItem[] = [];

  private listaWycieczek = new BehaviorSubject<WycieczkaItem[]>(this.wycieczki);
  getWycieczka = this.listaWycieczek.asObservable();

  constructor() { console.log("KONSTRUKTOR", this.wycieczki);}//console.log(this.wycieczki); }

  usuwaniePustych(){
    this.wycieczki = this.wycieczki.filter(item => item.ilosc > 0);
  // this.listaWycieczek.next(this.wycieczki);
  }

  aktualizujListe(wycieczka_id: number, operacja: number) {
    console.log("AKTUALNA", this.wycieczki);
    const nowa = this.wycieczki.find(item => item.id === wycieczka_id);
    if (nowa) {
      nowa["ilosc"] += operacja;
      this.usuwaniePustych();
      this.listaWycieczek.next(this.wycieczki);
    } else {
      this.wycieczki.push({ id: wycieczka_id, ilosc: 1 });
      this.listaWycieczek.next(this.wycieczki);
    }
    console.log(this.wycieczki);
  }

  getWycieczkaById(wycieczka_id: number){
    if (!this.wycieczki){
      return 0;
    }
    const nowa = this.wycieczki.find(item => item.id === wycieczka_id);
    if (nowa) {
      return nowa.ilosc;
    } else {
      return 0;
    }
  }

  usunMiejsce(wycieczka_id: number){
    const nowa = this.wycieczki.find(item => item.id === wycieczka_id);
    if (nowa) {
      nowa["ilosc"]--;
      this.usuwaniePustych();
      this.listaWycieczek.next(this.wycieczki);
    }
  }

  resetujListe(){
    this.wycieczki = [];
    this.listaWycieczek.next(this.wycieczki);
  }
}
