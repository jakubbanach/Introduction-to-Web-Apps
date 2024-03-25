import { Component, OnInit } from '@angular/core';
import { KoszykService } from '../app-services/koszyk.service';
import { WalutaService } from '../app-services/waluta.service';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrl: './koszyk.component.css'
})
export class KoszykComponent implements OnInit {
  ilosc: number = 0;
  koszt: number = 0;
  waluta: string = "";
  kurs_waluty: number = 1;

  constructor(private koszykService: KoszykService,
    private walutaService: WalutaService) {
    // this.ilosc = this.koszykService.ile;
    this.koszykService.getIlosc.subscribe(il => this.ilosc = il);
    this.koszykService.getCena.subscribe(cena => this.koszt = cena);
    this.walutaService.getWaluta.subscribe(item => this.waluta = item.waluta);
    this.walutaService.getWaluta.subscribe(wal => {
      this.koszt = +(this.koszt / this.kurs_waluty).toFixed(4);
      this.waluta = wal.waluta;
      this.kurs_waluty = wal.kurs;
      this.koszt = +(this.koszt * this.kurs_waluty).toFixed(4);
    });
  }

  ngOnInit(): void {
  }

}
