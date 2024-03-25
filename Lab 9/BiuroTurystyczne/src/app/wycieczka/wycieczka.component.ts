import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { KoszykService } from '../app-services/koszyk.service';
import { WalutaService } from '../app-services/waluta.service';
import { ListaWycieczekService } from '../app-services/lista-wycieczek.service';
import { DaneService } from '../app-services/dane.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Trip } from '../app-interfaces/interfaceTrip';
import { FilterInterface } from '../app-interfaces/interfaceFiltr';
import { FiltryComponent } from '../filtry/filtry.component';
import { AuthService } from '../app-services/auth.service';
import { User } from '../app-interfaces/interfaceUser';
import { Router } from '@angular/router';

// import * as daneWycieczek  from '../wycieczki.json';

@Component({
  selector: 'app-wycieczka',
  templateUrl: './wycieczka.component.html',
  styleUrl: './wycieczka.component.css'
})
export class WycieczkaComponent implements OnInit{
  
  constructor(private daneService: DaneService,
    private koszykService: KoszykService, 
    private walutaService: WalutaService, 
    private listaWycieczekService: ListaWycieczekService,
    private authService: AuthService,
    private router: Router){
      this.koszykService.getCena.subscribe(cena => this.koszt = cena);
      this.koszykService.getIlosc.subscribe(il => this.ile = il);
    }

    @Input() ifManager: boolean = false;
    wycieczki: any[] = [];
    poczatkoweMiejsca: {[identifier:number]: number} = {};
    ile: number=0;
    koszt: number=0;
    waluta: string="";
    kurs_waluty: number=1;
    pageSize = 10;
    p = 0; 
    ifGosc: boolean = false;
    // @Input() wycieczka: any; // Dane wycieczki
    // @Input() waluta: string; // Waluta
    @Output() wycieczkaChanged = new EventEmitter<any>(); // Emitowanie zmian

    editedWycieczka: any; // Kopia wycieczki do edycji
    editable: boolean = false; // Flaga umożliwiająca edycję

    filtrInterface: FilterInterface = {
      location: null,
      priceFrom: null,
      priceTo: null,
      dateFrom: null,
      dateTo: null,
      rating: null
    };
  
    najdrozsza: any;
    najtansza: any;
    wycieczkiSub: Subscription | undefined;
    
    ngOnInit(): void {
      this.wycieczkiSub = this.daneService.getWycieczki().subscribe((change) => {
        this.wycieczki = [];
        this.poczatkoweMiejsca = {};
        for (let trip of change) {
          this.wycieczki.push({
            id: trip.id,
            nazwa: trip.nazwa,
            docelowy_kraj: trip.docelowy_kraj,
            data_rozpoczecia: trip.data_rozpoczecia,
            data_zakonczenia: trip.data_zakonczenia,
            cena: trip.cena * this.kurs_waluty,
            miejsca: trip.miejsca - this.listaWycieczekService.getWycieczkaById(trip.id),
            opis: trip.opis,
            zdjecie: trip.zdjecie,
          } as Trip);
          this.poczatkoweMiejsca[trip.id] = trip.miejsca;
          this.editedWycieczka = { ...this.wycieczki };
        }
        // console.log(this.poczatkoweMiejsca)
        this.najdrozsza = this.getNajdrozsza();
        this.najtansza = this.getNajtansza();
      });
      this.walutaService.getWaluta.subscribe(wal => {
        this.wycieczki.forEach(wycieczka => {
          wycieczka.cena = +(wycieczka.cena / this.kurs_waluty).toFixed(4);
          if (wycieczka.id === 1){
          console.log("WALUTA", wycieczka.id, wycieczka.cena)
          }
        });
        
        this.waluta = wal.waluta;
        this.kurs_waluty = wal.kurs;
        this.wycieczki.forEach(wycieczka => {
          wycieczka.cena = +(wycieczka.cena * this.kurs_waluty).toFixed(4);
          if (wycieczka.id === 1){
            console.log("WALUTA", wycieczka.id, wycieczka.cena)
            }
        });
      });
      this.walutaService.getGlobalneFiltry.subscribe(filtr => {
        this.filtrInterface = filtr;
        // console.log("HMMM", this.filtrInterface);
      });
      // this.hmmmmm = this.daneService.getList();
      // console.log("HMMM", this.hmmmmm);
  }

    getNajdrozsza() {
      return this.wycieczki
        .filter(wycieczka => wycieczka.miejsca > 0)
        .reduce((prev, current) => (prev.cena > current.cena) ? prev : current);
    }

    getNajtansza() {
      return this.wycieczki
        .filter(wycieczka => wycieczka.miejsca > 0)
        .reduce((prev, current) => (prev.cena < current.cena) ? prev : current);
    }

  rezerwujMiejsce(wycieczka: any) {
    if (wycieczka.miejsca > 0) {
      wycieczka.miejsca--;
      this.koszt += wycieczka.cena;
      console.log("KOSZT", this.koszt)
      this.koszykService.aktualizujIlosc(1);
      this.koszykService.aktualizujCene(wycieczka.cena);
      this.listaWycieczekService.aktualizujListe(wycieczka.id, 1);
      if (wycieczka.miejsca === 0){
        this.najdrozsza = this.getNajdrozsza();
        this.najtansza = this.getNajtansza();
      }
    }
  }
  
  rezygnujZMiejsca(wycieczka: any, index: number) {
    if (wycieczka.miejsca < this.poczatkoweMiejsca[wycieczka.id]) {
      wycieczka.miejsca++;
      this.koszt -= wycieczka.cena*this.kurs_waluty;
      console.log("KOSZT", this.koszt)
      this.koszykService.aktualizujIlosc(-1);
      this.koszykService.aktualizujCene(-wycieczka.cena);
      this.listaWycieczekService.aktualizujListe(wycieczka.id, -1);
      if (wycieczka.miejsca === 1){
        this.najdrozsza = this.getNajdrozsza();
        this.najtansza = this.getNajtansza();
      }

    }
  }
  
  usunWycieczke(wycieczka: Trip){
    console.log(wycieczka.id);
    this.daneService.deleteTrip(wycieczka.id);
    // this.najdrozsza = this.getNajdrozsza();
    // this.najtansza = this.getNajtansza();
    this.router.navigate(['manager']);
    this.wycieczkiSub = this.daneService.getWycieczki().subscribe((change) => {
      this.wycieczki = [];
      this.poczatkoweMiejsca = {};
      for (let trip of change) {
        this.wycieczki.push({
          id: trip.id,
          nazwa: trip.nazwa,
          docelowy_kraj: trip.docelowy_kraj,
          data_rozpoczecia: trip.data_rozpoczecia,
          data_zakonczenia: trip.data_zakonczenia,
          cena: trip.cena * this.kurs_waluty,
          miejsca: trip.miejsca - this.listaWycieczekService.getWycieczkaById(trip.id),
          opis: trip.opis,
          zdjecie: trip.zdjecie,
        } as Trip);
        this.poczatkoweMiejsca[trip.id] = trip.miejsca;
        this.editedWycieczka = { ...this.wycieczki };
      }
      // console.log(this.poczatkoweMiejsca)
      this.najdrozsza = this.getNajdrozsza();
      this.najtansza = this.getNajtansza();
    });
  }

  getClassName(wycieczka: any){
    if (wycieczka.miejsca === 0){
      return 'sprzedane';
    }
    if (wycieczka === this.najdrozsza){
      return 'najdrozsza';
    }
    if (wycieczka === this.najtansza){
      return 'najtansza';
    }
    return 'inne';
  }

  toggleEditable(wycieczka: any, event: Event) {
    wycieczka.editable = !wycieczka.editable;
    // console.log(wycieczka.editable, wycieczka);
    // console.log(event);
    if (!wycieczka.editable) {
      delete wycieczka.editable;
      this.daneService.updateTrip(wycieczka);
    }
  }

  // reservedPlaces(id: number) {
  //   return this.listaWycieczekService.getWycieczkaById(id)
  // }

  checkNumber(wycieczka: number) {
    console.log(wycieczka);
  }

  getUser(){
    return this.authService.userRoles.klient || this.authService.userRoles.manager || this.authService.userRoles.admin;
  }
}
