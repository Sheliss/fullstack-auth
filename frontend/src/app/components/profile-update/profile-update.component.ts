import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileData } from 'src/app/Interfaces';
import { AccountService } from 'src/app/services/account.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  error: string = '';
  profile: ProfileData = {
    name: '',
    email: ''
  }

  constructor (
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
      },
      error: (err) => {
        this.error = err.toString();
      }
    })
  }



  updateForm = new FormGroup({
    changeEmail: new FormControl(this.profile.email, [Validators.email]),
    changeName: new FormControl(''),
    changeNewPassword: new FormControl(''),
    changeOldPassword: new FormControl('', [Validators.required])

  })
}
