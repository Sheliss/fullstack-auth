import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NewUserData } from 'src/app/Interfaces';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [ FormsModule, 
    ReactiveFormsModule, 
    NgIf,
    RouterModule, 
    MatGridListModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class SignupComponent {
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  signupForm = new FormGroup ({
    signupName: new FormControl('', [Validators.required]),
    signupEmail: new FormControl('', [Validators.required, Validators.email]),
    signupPassword: new FormControl('', [Validators.required]),
    signupRepeatPassword: new FormControl('', [Validators.required])
  });

  onSubmit() {
    const name = this.signupForm.value.signupName;
    const email = this.signupForm.value.signupEmail;
    const password = this.signupForm.value.signupPassword;
    const repeatPassword = this.signupForm.value.signupRepeatPassword;

    if(
      typeof(name) === 'string' 
      && typeof(email) === 'string' 
      && typeof(password) === 'string'
    ) {
      
      if(password === repeatPassword) {
        const newUser: NewUserData = {
          name: name,
          email: email,
          password: password
        }
        
        this.registerUser(newUser);

      } else {
        this.onErrorSnackBox(`Passwords didn't match`)
      }

    } else {
      this.onErrorSnackBox(`Something wrong with input data`)
      return
    }
    
  }

  registerUser(data: NewUserData) {
    this.accountService.newUser(data).subscribe({
      next: (res: any) => {
        if(typeof res.name === 'string') {
          const name: string = res.name;
          this.userService.setUser(true, name);
        } else {
          console.error('Wrong response type');
          return;
        }
        this.router.navigate(['/profile'])
      }, error: (err) => {
        this.onErrorSnackBox(err.toString())
      }
    })
  }

  onErrorSnackBox(error: string) {
    this._snackBar.open(error, 'OK', {
      duration: 3000,
      panelClass: 'notification-error'
    })
    this.signupForm.patchValue({
      signupPassword: '',
      signupRepeatPassword: ''
    })
  }
}
