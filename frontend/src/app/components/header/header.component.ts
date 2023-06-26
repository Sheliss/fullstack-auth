import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { currentUser } from 'src/app/Interfaces';
import { UserService } from 'src/app/services/user.service';
import { AccountService } from 'src/app/services/account.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ 
    CommonModule, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule
   ]
})


export class HeaderComponent implements OnInit {
  currentUser: currentUser = {
    isLogged: false,
    name: ''
  }

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUser();
    this.userService.currentUser.subscribe((user: currentUser) => this.currentUser = user);
  }

  onLogout() {
    this.accountService.onLogout().subscribe(
      () => {
        this.userService.setUser(false, '');
        this.router.navigate(['/'])
      }
    );
  }

}
