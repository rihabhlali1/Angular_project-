import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  login(): void {
    // Ajoutez votre logique de connexion ici
    console.log(`Connexion avec ${this.username} - Mot de passe: ${this.password}`);
    // Réinitialiser les champs après la connexion
    this.username = '';
    this.password = '';
  }
}
