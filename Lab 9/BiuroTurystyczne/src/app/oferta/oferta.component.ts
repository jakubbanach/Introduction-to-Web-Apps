import { Component } from '@angular/core';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrl: './oferta.component.css'
})

export class OfertaComponent {
  pageChanged: boolean = false;
  p: number = 1;
}
