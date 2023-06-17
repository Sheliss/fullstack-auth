import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  //nameFormControl = new FormControl('', [Validators.required]);
  //emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  loginForm = new FormGroup ({
    loginName: new FormControl('', [Validators.required]),
    loginPassword: new FormControl('', [Validators.required])
  });
}
