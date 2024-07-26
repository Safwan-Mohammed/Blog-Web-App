import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ MatButtonModule, RouterModule, CommonModule, ToastModule, ButtonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent implements OnInit {
  isLoggedIn : boolean = !!localStorage.getItem('email')

  constructor(private activatedRoute : ActivatedRoute, private authService : AuthService, private router : Router){}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  toggleLogin(): void {
    if (this.isLoggedIn) {
      this.authService.signOut({refreshToken : localStorage.getItem('refreshToken')! , email : localStorage.getItem('email')!})
    }
  }

}
