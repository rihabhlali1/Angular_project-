import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  @Output() registerClicked = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(
        response => {
          if (response.success) {
            localStorage.setItem('token', response.token);
            console.log('Login successful');
          } else {
            alert(response.error);
          }
        },
        error => {
          console.error('Login failed', error);
          alert('An error occurred during login.');
        }
      );
    } else {
      alert('Please fill in all fields.');
    }
  }

  register() {
    this.registerClicked.emit();
  }
}
