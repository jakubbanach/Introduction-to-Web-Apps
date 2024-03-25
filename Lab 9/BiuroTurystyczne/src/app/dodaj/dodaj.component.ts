import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { DaneService } from '../app-services/dane.service';
import { Trip } from '../app-interfaces/interfaceTrip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dodaj',
  templateUrl: './dodaj.component.html',
  styleUrl: './dodaj.component.css',
})

export class DodajComponent{
  constructor(private daneService: DaneService, 
    private router: Router) {}
  incompleteForm = false;
  alert = "";
  dodane: string[]= [];
  form = {
    nazwa: '',
    docelowy_kraj: '',
    data_rozpoczecia: '',
    data_zakonczenia: '',
    cena: '',
    miejsca: '',
    opis: '',
    zdjecie: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/South_majorca_in_winter.jpg/180px-South_majorca_in_winter.jpg'
  };

  handleFileInput(event: any): void {
    const files: FileList = event.target.files;
    if(files) {
      this.dodane.push(files[0].name);
    }
    console.log(files);
  }

  dodajWycieczke(form: NgForm) {
    let newTrip = {
      // id jest dodawane w serwisie
      nazwa: this.form.nazwa,
      docelowy_kraj: this.form.docelowy_kraj,
      data_rozpoczecia: this.form.data_rozpoczecia,
      data_zakonczenia: this.form.data_zakonczenia,
      cena: parseFloat(this.form.cena),
      miejsca: parseFloat(this.form.miejsca),
      opis: this.form.opis,
      zdjecie: this.form.zdjecie,
      // zdjecie: new Array<string>(
      //   this.form.get('dishimagelink')!.value
      // ),
      // ocena: 0,
      // recenzja: []
    } as Trip;
    if(newTrip.data_zakonczenia<newTrip.data_rozpoczecia){
      // console.log("ZLE DATY");
      alert("ZŁE DATY");
      this.form.data_rozpoczecia = '';
      this.form.data_zakonczenia = '';
      return;
    }
      this.daneService.addWycieczka(newTrip);
      alert("WYCIECZKA DODANA");
      this.form.nazwa= '';
      this.form.docelowy_kraj = '';
      this.form.data_rozpoczecia = '';
      this.form.data_zakonczenia = '';
      this.form.cena = '';
      this.form.miejsca = '';
      this.form.opis = '';
      this.router.navigate(['']);
      // this.onReset(form);
  }

  onReset(form: NgForm): void {
    form.reset();
  }
}

