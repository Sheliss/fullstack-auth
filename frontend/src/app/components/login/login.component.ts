import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { LoginData } from 'src/app/Interfaces';

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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    MatSnackBarModule ]
})
export class LoginComponent {

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  loginForm = new FormGroup ({
    loginEmail: new FormControl('', [Validators.required, Validators.email]),
    loginPassword: new FormControl('', [Validators.required])
  });

  onSubmit() {
    const email = this.loginForm.value.loginEmail;
    const password = this.loginForm.value.loginPassword;

    if( typeof(email) === 'string' && typeof(password) === 'string' ) {
      const data: LoginData = {
        email: email,
        password: password
      }

      this.loginUser(data);
    } else {
      return console.error('Something wrong')
    }

  }

  loginUser(data: LoginData) {
    this.accountService.onLogin(data).subscribe({
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
        this.onErrorSnackBox(err.toString());
      }
    });
  }

  onErrorSnackBox(error: string) {
    this._snackBar.open(error, 'OK', {
      duration: 3000,
      panelClass: 'notification-error'
    })
    this.loginForm.patchValue({
      loginPassword: ''
    })
  }

  
}
