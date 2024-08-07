import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5217/api/auth';   

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        catchError(error => {
          console.error('Login error:', error);
          return of({ success: false, error: 'An error occurred during login.' });
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { username, email, password })
      .pipe(
        catchError(error => {
          console.error('Registration error:', error);
          return of({ success: false, error: 'An error occurred during registration.' });
        })
      );
  }
}
