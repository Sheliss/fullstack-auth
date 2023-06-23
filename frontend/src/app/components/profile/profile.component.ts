import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { currentUser } from 'src/app/Interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private userService: UserService
  ) {}

  onLogout() {
    this.accountService.onLogout().subscribe(
      () => {
        const currentUser: currentUser = {
          isLogged: false,
          name: ''
        }
        localStorage.setItem('user', JSON.stringify(currentUser));
        this.router.navigate(['/'])
      }
    );
  }



}
