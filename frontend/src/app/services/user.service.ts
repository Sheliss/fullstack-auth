import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { currentUser } from '../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private user = new BehaviorSubject<currentUser>(
    {
      isLogged: false,
      name: ''
    }
  );

  currentUser = this.user.asObservable();

  getUser() {
    if( localStorage.getItem('user') === null ) {
      const newUser: string = JSON.stringify(this.user);

      localStorage.setItem('user', newUser)
    }

    const temp: string = localStorage.getItem('user') || '';
    const parsed: currentUser = JSON.parse(temp);
    this.user.next(parsed);
    return parsed;
  }

  setUser(status: boolean, name: string) {
    const user: currentUser = {
      isLogged: status,
      name: name
    }

    this.user.next(user);
    const jsonUser = JSON.stringify(user);
    localStorage.setItem('user', jsonUser);
  }



}
