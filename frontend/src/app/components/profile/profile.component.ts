import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ProfileData } from 'src/app/Interfaces';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
      this.accountService.getProfile().subscribe((profile: ProfileData) => (this.profile = profile));
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
