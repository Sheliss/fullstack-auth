import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileData, UpdateUser } from 'src/app/Interfaces';
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
    private accountService: AccountService,
    private router: Router
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
    changeEmail: new FormControl('', [Validators.email]),
    changeName: new FormControl(''),
    changeNewPassword: new FormControl('')
  })

  onSubmit() {
    let updateData: UpdateUser = {};


    if( this.updateForm.value.changeEmail !== (null && '') ) {
      updateData.email = this.updateForm.value.changeEmail;
    }

    if( this.updateForm.value.changeName !== (null && '') ) {
      updateData.name = this.updateForm.value.changeName;
    }

    if( this.updateForm.value.changeNewPassword !== (null && '') ) {
      updateData.password = this.updateForm.value.changeNewPassword;
    }
    
    if( Object.keys(updateData).length > 0 ) {
      this.accountService.updateProfile(updateData).subscribe({
        next: () => {
          this.router.navigate(['/profile']);
        }, error: (err) => {
          console.error(err);
        }
      })
    } else {
      return console.error('something wrong')
    }
  }



}
