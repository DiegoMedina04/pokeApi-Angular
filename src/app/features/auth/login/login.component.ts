import { Component } from '@angular/core';
import { LoginDto } from '../../../core/Dto/loginDto';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userLogin: LoginDto = {
    username: '',
    password: ''
  };

  constructor(private router:Router ) { }
  ngOnInit(): void {

  }

  onSubmit() {
    const usuario = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    console.log(this.userLogin);
    console.log(usuario);
    console.log(password);
    if (this.userLogin.username === usuario && this.userLogin.password === password) {
      localStorage.setItem("isLogged", "true");
      this.router.navigate(['/pokedex']);
      return ;
    } else {
      alert("Usuario no valido");
    }
  }

}
