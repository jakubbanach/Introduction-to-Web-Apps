import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';
import { FiltryComponent } from './filtry/filtry.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { OcenaComponent } from './ocena/ocena.component';
import { StartComponent } from './start/start.component';
import { DodajComponent } from './dodaj/dodaj.component';
import { ZawartoscKoszykaComponent } from './zawartosc-koszyka/zawartosc-koszyka.component';
import { HistoriaComponent } from './historia/historia.component';
import { OfertaComponent } from './oferta/oferta.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardManagerComponent } from './dashboard-manager/dashboard-manager.component';
import { WycieczkaDetailsComponent } from './wycieczka-details/wycieczka-details.component';
import { wycieczkaGuard } from './guard/wycieczka.guard';

const routes: Routes = [
  { path: 'admin', component: DashboardAdminComponent, canActivate: [AuthGuard]},
  { path: 'manager', component: DashboardManagerComponent, canActivate: [AuthGuard]},
  { path: 'home', component: StartComponent }, 
  { path: 'wycieczki', component: OfertaComponent }, 
  { path: 'dodaj', component: DodajComponent, canActivate: [AuthGuard] }, 
  { path: 'wycieczki/dodaj', component: DodajComponent, canActivate: [AuthGuard] }, 
  { path: 'wycieczki/:id', component: WycieczkaDetailsComponent, canActivate: [wycieczkaGuard] }, 
  { path: 'koszyk', component: ZawartoscKoszykaComponent, canActivate: [AuthGuard] }, 
  { path: 'historia', component: HistoriaComponent, canActivate: [AuthGuard] }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
