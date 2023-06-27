import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { currentUser } from 'src/app/Interfaces';
import { UserService } from 'src/app/services/user.service';
import { AccountService } from 'src/app/services/account.service';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  standalone: true,
  imports: [ CommonModule, RouterModule, MatCardModule, MatGridListModule, MatButtonModule ]
})
export class HeroComponent implements OnInit {
  currentUser: currentUser = {
    isLogged: false,
    name: ''
  }

  constructor(
    private userService: UserService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.userService.getUser();
    this.userService.currentUser.subscribe((user: currentUser) => this.currentUser = user);
  }

  onLogout() {
    this.accountService.onLogout().subscribe(
      () => {
        this.userService.setUser(false, '');
      }
    );
  }

}
