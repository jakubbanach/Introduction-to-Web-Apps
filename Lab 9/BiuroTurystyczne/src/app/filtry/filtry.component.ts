import { Component } from '@angular/core';
import { WalutaService } from '../app-services/waluta.service';
import { FilterInterface } from '../app-interfaces/interfaceFiltr';
import { OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filtry',
  templateUrl: './filtry.component.html',
  styleUrl: './filtry.component.css'
})

export class FiltryComponent implements OnInit {
  waluta: string = "PLN";
  filters: FilterInterface = {
    location: null,
    priceFrom: null,
    priceTo: null,
    dateFrom: null,
    dateTo: null,
    rating: null
  };
  initialValues = { ...this.filters };

  constructor(private walutaService: WalutaService) {  }

  ngOnInit() {
    this.walutaService.getWaluta.subscribe(item => {
      this.waluta = item.name;
      console.log("WALURKA",this.waluta);
      });
  }

  getWybranaWaluta(event: Event) {
    const target = event.target as HTMLInputElement;
    this.walutaService.aktualizujWalute(target.id);
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const propertyName = target.id;
    if (propertyName in this.filters) {
      this.filters[propertyName] = target.value;
    }
    console.log(propertyName, propertyName in this.filters);
    this.walutaService.aktualizujFiltry(this.getFilters());
  }

  onReset(form: NgForm) {
    form.resetForm();
    form.form.patchValue(this.initialValues);
    console.log(form);
  }

  getFilters() {
    return this.filters;
  }
}
