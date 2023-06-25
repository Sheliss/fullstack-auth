import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { Router, RouterModule } from '@angular/router';
import { ProfileData } from 'src/app/Interfaces';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  status: string = "loading";
  error: string = '';

  profile: ProfileData = {
    name: '',
    email: ''
  }

  constructor(
    private accountService: AccountService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
      this.accountService.getProfile().subscribe({
        next: (res) => {
          this.profile = res;
          this.status = 'profile';
        },
        error: (err) => {
          this.error = err.toString();
          this.status = 'error';

          this.userService.setUser(false, ''); 
        }
      })
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
