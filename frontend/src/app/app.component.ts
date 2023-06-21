import { Component, OnInit } from '@angular/core';
import { currentUser } from './Interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
      if (localStorage.getItem('user') === null) {
        const currentUser: currentUser = {
          isLogged: false,
          name: ''
        }

        localStorage.setItem('user', JSON.stringify(currentUser))
      }
  }

  title = 'frontend';
}
