import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { LoginData } from 'src/app/Interfaces';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule ]
})
export class LoginComponent {

  constructor(
    private accountService: AccountService
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

      this.accountService.onLogin(data).subscribe((res: any) => {
        console.log(res)
      });
    } else {
      return console.error('Something wrong')
    }

  }
}
