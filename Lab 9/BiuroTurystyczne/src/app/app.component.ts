import { Component } from '@angular/core';
import { AuthService } from './app-services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BiuroTurystyczne';
  constructor(public authService: AuthService) { }
}
