import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, UrlTree, RouterStateSnapshot, Router } from
  '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../app-services/auth.service';
import { DaneService } from '../app-services/dane.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private daneService: DaneService,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn() !== true) {
      this.router.navigate([''])
    }
    return true;
  }
}