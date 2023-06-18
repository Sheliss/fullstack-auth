import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { LoginData } from 'src/app/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  onLogin(data: LoginData) : Observable<any> {
    return this.http.post('http://localhost:5000/api/users/auth', data)
    .pipe(catchError(err => {
      return throwError(() => new Error(err))
    }));
  }

}
