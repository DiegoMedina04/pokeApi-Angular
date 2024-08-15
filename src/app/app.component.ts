import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CARTELERA_CINE';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLogged();
  }
}
