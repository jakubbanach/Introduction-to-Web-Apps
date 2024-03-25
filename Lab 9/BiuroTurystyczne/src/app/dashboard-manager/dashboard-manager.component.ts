import { Component } from '@angular/core';
import { WycieczkaComponent } from '../wycieczka/wycieczka.component';
import { KoszykService } from '../app-services/koszyk.service';
import { WalutaService } from '../app-services/waluta.service';
import { DaneService } from '../app-services/dane.service';
import { ListaWycieczekService } from '../app-services/lista-wycieczek.service';
import { AuthService } from '../app-services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-manager',
  templateUrl: './dashboard-manager.component.html',
  styleUrl: './dashboard-manager.component.css'
})
export class DashboardManagerComponent extends WycieczkaComponent {
  
  constructor(daneService: DaneService, 
    koszykService: KoszykService,
    walutaService: WalutaService,
    listaWycieczekService: ListaWycieczekService, 
    authService: AuthService,
    router: Router) { 
    super(daneService, koszykService, walutaService, listaWycieczekService, authService, router);
    this.ifManager = true;
  }


}

