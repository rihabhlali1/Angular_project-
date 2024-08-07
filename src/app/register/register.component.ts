import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  @Output() loginClicked = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  register() {
    if (this.username && this.email && this.password) {
      this.authService.register(this.username, this.email, this.password).subscribe(
        response => {
          if (response.success) {
            console.log('Registration successful');
          } else {
            alert(response.error);
          }
        },
        error => {
          console.error('Registration error:', error);
          alert('An error occurred during registration.');
        }
      );
    } else {
      alert('Please fill in all fields.');
    }
  }

  login() {
    this.loginClicked.emit();
  }
}
