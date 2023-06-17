import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ MatToolbarModule, MatButtonModule, MatIconModule ]
})


export class HeaderComponent {

  constructor( private router: Router ) {}

  goToHero() {
    this.router.navigateByUrl('');
  }
}
