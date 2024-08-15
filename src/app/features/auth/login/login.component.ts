import { Component } from '@angular/core';
import { LoginDto } from '../../../core/Dto/loginDto';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

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

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.userLogin.username, this.userLogin.password);
  }

}
