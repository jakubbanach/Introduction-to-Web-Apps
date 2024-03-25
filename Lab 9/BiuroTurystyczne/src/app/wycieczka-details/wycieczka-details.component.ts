import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { DaneService } from '../app-services/dane.service';
import { WalutaService } from '../app-services/waluta.service';
import { ListaWycieczekService } from '../app-services/lista-wycieczek.service';
import { Trip } from '../app-interfaces/interfaceTrip';

@Component({
  selector: 'app-wycieczka-details',
  templateUrl: './wycieczka-details.component.html',
  styleUrl: './wycieczka-details.component.css'
})
export class WycieczkaDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private walutaService: WalutaService, 
    private daneService: DaneService,
    private listaWycieczekService: ListaWycieczekService,
  ) {}
  private subscription: Subscription | undefined;

  id: number = -1;
  trip: Trip[] = [];
  selected: number = 0;
  reviews: review[] = [];
  waluta: string="";
  kurs_waluty: number=1;

  ngOnInit(): void {
    window.scroll(0,0);
    this.walutaService.getWaluta.subscribe(wal => {
      this.waluta = wal.waluta;
      this.kurs_waluty = wal.kurs;
      });

    this.subscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.daneService
        .getWycieczki()
        .pipe(first())
        .subscribe((trips: any[]) => {
          let trip: any;
          for (let t of trips) {
            if (t.id == this.id) {
              trip = t;
              break;
            }
          }
          console.log(trip);
          console.log(this.id);
          this.trip.push({
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
        });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  // nextPhoto() {
  //   if (this.selected == this.trip[0].imagelink.length - 1) this.selected = 0;
  //   else {
  //     this.selected += 1;
  //   }
  // }
  // previousPhoto() {
  //   if (this.selected >= 1) this.selected -= 1;
  //   else {
  //     this.selected = this.dish[0].imagelink.length - 1;
  //   }
  // }

  addReview(newReview: review) {
    this.reviews.push(newReview);
  }

  // ratingEventHandler(dish: Trip, ev: any) {
  //   if (ev == 1) {
  //     dish.likes += 1;
  //   } else {
  //     dish.dislikes += 1;
  //   }
  // }
}
interface review {
  nick: string;
  date: string;
  review: string;
}