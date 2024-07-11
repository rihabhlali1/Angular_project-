import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  register() {
    // Ajoutez ici la logique pour l'inscription
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}
