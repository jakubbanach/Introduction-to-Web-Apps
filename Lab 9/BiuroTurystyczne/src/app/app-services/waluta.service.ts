import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterInterface } from '../app-interfaces/interfaceFiltr';

interface WalutaItem {
  waluta: string;
  kurs: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class WalutaService {
  private waluty: WalutaItem[] = [
    { waluta: 'PLN', kurs: 1, name: 'zloty' },
    { waluta: '$', kurs: 0.25, name: 'dolar' },
    { waluta: '€', kurs: 0.23, name: 'euro' }
  ];

  private filtry: FilterInterface = {
    location: null,
    priceFrom: null,
    priceTo: null,
    dateFrom: null,
    dateTo: null,
    rating: null
  };


  private globalnaWaluta = new BehaviorSubject<WalutaItem>(this.waluty[0]);
  getWaluta = this.globalnaWaluta.asObservable();

  private globalneFiltry = new BehaviorSubject<FilterInterface>(this.filtry);
  getGlobalneFiltry = this.globalneFiltry.asObservable();

  constructor() { }

  aktualizujWalute(nowaWaluta: string | undefined) {
    if (nowaWaluta !== undefined) {
      switch (nowaWaluta) {
        case 'zloty':
          nowaWaluta = 'PLN';
          break;
        case 'dolar':
          nowaWaluta = '$';
          break;
        case 'euro':
          nowaWaluta = '€';
          break;
    }
      const nowa = this.waluty.find(item => item.waluta === nowaWaluta);
      if (nowa) {
        this.globalnaWaluta.next(nowa);
      }
    }
  }
  aktualizujFiltry(filtr: FilterInterface){
    this.filtry = filtr;
    this.globalneFiltry.next(this.filtry); 
    console.log("FILTRY",this.filtry);
    console.log("GLOBALNE", this.getGlobalneFiltry);
  }
}