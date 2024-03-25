import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
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
import { FilterPipe } from './pipes/filtr.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardManagerComponent } from './dashboard-manager/dashboard-manager.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { WycieczkaDetailsComponent } from './wycieczka-details/wycieczka-details.component';

@NgModule({
  declarations: [
    AppComponent,
    WycieczkaComponent,
    FiltryComponent,
    KoszykComponent,
    OcenaComponent,
    StartComponent,
    DodajComponent,
    ZawartoscKoszykaComponent,
    HistoriaComponent,
    OfertaComponent,
    PageNotFoundComponent,
    FilterPipe,
    LoginComponent,
    RegisterComponent,
    DashboardManagerComponent,
    DashboardAdminComponent,
    WycieczkaDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [FilterPipe],
  bootstrap: [AppComponent]

})
export class AppModule {}
