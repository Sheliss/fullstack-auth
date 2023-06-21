import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AccountService } from 'src/app/services/account.service';

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
  constructor(private accountService: AccountService) {}

  onLogout() {
    this.accountService.onLogout().subscribe(
      (res: any) => console.log(res)
    );
  }

}
