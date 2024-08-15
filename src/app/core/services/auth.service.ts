import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router) { }

  login(username: string, password: string): void {
    const usuarioStorage = localStorage.getItem("username")
    const passwordStorage = localStorage.getItem("password")

    if (username === usuarioStorage && password === passwordStorage) {
      localStorage.setItem("isLogged", "true");
      this.router.navigate(['/pokedex']);
      return;
    } else {
      alert("Usuario no valido");
    }
  }

  isLogged(): void {
    localStorage.setItem("username", "iptdevs");
    localStorage.setItem("password", "123456");
    const isLogged = localStorage.getItem("isLogged");

    if (isLogged == "true") {
      this.router.navigate(['/pokedex']);
    } else {
      this.router.navigate(['/auth/login']);
    }

  }
  logout() {
    localStorage.setItem('isLogged', "false");
    this.router.navigate(['/auth/login']);
  }
}



// logout() {
//   localStorage.setItem('isLogged', "false");
// }


