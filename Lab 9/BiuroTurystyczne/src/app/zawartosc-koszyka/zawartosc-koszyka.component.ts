import { Component, OnInit } from '@angular/core';
import { ListaWycieczekService } from '../app-services/lista-wycieczek.service';
import { DaneService } from '../app-services/dane.service';
import { WalutaService } from '../app-services/waluta.service';
import { KoszykService } from '../app-services/koszyk.service';
import { Subscription } from 'rxjs';
import { Trip } from '../app-interfaces/interfaceTrip';

interface Wycieczka {
  id: number;
  ilosc: number;
  wybrana: boolean;
}

@Component({
  selector: 'app-zawartosc-koszyka',
  templateUrl: './zawartosc-koszyka.component.html',
  styleUrl: './zawartosc-koszyka.component.css'
})

export class ZawartoscKoszykaComponent{
  wycieczki: any[] = [];
  listaWycieczek: Wycieczka[] = [] = [];
  wycieczkiDoWyswietlenia: any[] = [];
  sumaWartosci: number = 0;
  wycieczkiSub: Subscription | undefined;
  waluta: string="";
  kurs_waluty: number=1;

  constructor(private listaWycieczekService: ListaWycieczekService,
    private daneService: DaneService,
    private walutaService: WalutaService, private koszykService: KoszykService) {
    this.listaWycieczekService.getWycieczka.subscribe(list => {
      this.listaWycieczek = list.map(item => ({
        ...item,
        wybrana: true
      }));
    });
    this.wycieczkiSub = this.daneService.getWycieczki().subscribe((change) => {
      this.wycieczki = [];
      console.log("A",this.wycieczki);
      console.log("LO",this.listaWycieczek);
      for (let trip of this.listaWycieczek) {
        console.log("B",trip.id);
        var znaleziona = change.find(item => item.id === trip.id);
        if (change.find(item => item.id === trip.id)) {
          this.wycieczki.push({
          id: znaleziona.id,
          nazwa: znaleziona.nazwa,
          docelowy_kraj: znaleziona.docelowy_kraj,
          data_rozpoczecia: znaleziona.data_rozpoczecia,
          data_zakonczenia: znaleziona.data_zakonczenia,
          cena: znaleziona.cena * this.kurs_waluty,
          miejsca: znaleziona.miejsca - this.getIloscMiejsc(znaleziona.id),
          opis: znaleziona.opis,
          zdjecie: znaleziona.zdjecie,
        } as Trip);
        }
      }
      this.obliczSumeWartosci();
    });
    
    this.walutaService.getWaluta.subscribe(wal => {
      this.wycieczki.forEach(wycieczka => {
        wycieczka.cena = Math.round(wycieczka.cena / this.kurs_waluty / 100) * 100;
      });
      
      this.waluta = wal.waluta;
      this.kurs_waluty = wal.kurs;
      this.wycieczki.forEach(wycieczka => {
        wycieczka.cena = Math.round(wycieczka.cena * this.kurs_waluty * 100) / 100;
      });
    });
  }

  rezerwujMiejsce(wycieczka: Trip) {
    if (wycieczka.miejsca > 0) {
      wycieczka.miejsca--;
      this.koszykService.aktualizujIlosc(1);
      this.koszykService.aktualizujCene(wycieczka.cena);
      this.listaWycieczekService.aktualizujListe(wycieczka.id, 1);
    }
    this.obliczSumeWartosci();
  }

  rezygnujZMiejsca(wycieczka: Trip) {
    if (this.getIloscMiejsc(wycieczka.id)>0) {
      wycieczka.miejsca++;
      this.koszykService.aktualizujIlosc(-1);
      this.koszykService.aktualizujCene(-wycieczka.cena);
      this.listaWycieczekService.aktualizujListe(wycieczka.id, -1);
    }
    this.obliczSumeWartosci();
  }

  getIloscMiejsc(numerWycieczki: number) {
    var found =  this.listaWycieczek.find(item => item.id === numerWycieczki);
    if (found === undefined) {
      return 0;
    }
    return found.ilosc;
  }

  czyWycieczkaWybrana(numerWycieczki: number) {
    const found = this.listaWycieczek.find(item => item.id === numerWycieczki);
    return found ? found.wybrana : false;
  }

  aktualizujWybranaCheckboxa(numerWycieczki: number) {
    const foundIndex = this.listaWycieczek.findIndex(item => item.id === numerWycieczki);
    if (foundIndex !== -1) {
      this.listaWycieczek[foundIndex].wybrana = !this.listaWycieczek[foundIndex].wybrana;
    }
    console.log(this.listaWycieczek);
    this.obliczSumeWartosci();
  }

  // TODO
  obliczSumeWartosci() {
    this.sumaWartosci = this.listaWycieczek.reduce((suma, wycieczka) => {
      const znalezionaWycieczka = this.wycieczki.find(item => item.id === wycieczka.id);
      if (znalezionaWycieczka && wycieczka.wybrana) {
        return suma + wycieczka.ilosc * znalezionaWycieczka.cena;
      } else {
        return suma;
      }
    }, 0);
  }
  
  // TODO
  kupWycieczki() {
    const wybraneWycieczki = this.listaWycieczek.filter(wycieczka => wycieczka.wybrana);
    console.log(wybraneWycieczki)
    wybraneWycieczki.forEach(wycieczka => {
      this.listaWycieczekService.aktualizujListe(wycieczka.id, -wycieczka.ilosc);
      this.koszykService.aktualizujIlosc(-wycieczka.ilosc);
      const znalezionaWycieczka = this.wycieczki.find(item => item.id === wycieczka.id);
      this.koszykService.aktualizujCene(-wycieczka.ilosc * znalezionaWycieczka.cena);
      this.daneService.updateTrip(this.wycieczki.find(item => item.id === wycieczka.id))
      // this.koszykService.resetujKoszyk();
    });
    this.obliczSumeWartosci(); // Przelicz sumę wartości po usunięciu wycieczek
  }
}
