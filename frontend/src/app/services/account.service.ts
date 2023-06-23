import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { LoginData } from 'src/app/Interfaces';

@Injectable({
  providedIn: 'root'
})


export class AccountService {
  private apiUri = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  onLogin(data: LoginData) : Observable<any> {
    return this.http.post( this.apiUri + 'users/auth', data, {
      withCredentials: true
    })
    .pipe(catchError(err => {
      return throwError(() => new Error(err.status))
    }));
  }

  onLogout() : Observable<any> {
    return this.http.post(this.apiUri + 'users/logout', '', {
      withCredentials: true
    });
  }

  getProfile() : Observable<any> {
    return this.http.get(this.apiUri + 'users/profile', {
      withCredentials: true
    })
    .pipe(catchError(err => {
      return throwError(() => new Error(err))
    }))
  }

}
