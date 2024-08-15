import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CARTELERA_CINE';

  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem("username", "iptdevs");
    localStorage.setItem("password", "123456");
    const isLogged = localStorage.getItem("isLogged");
    
    if (isLogged=="true") {
       this.router.navigate(['/pokedex']);
    } else {
      this.router.navigate(['/auth/login']);    
  }
  }
}
