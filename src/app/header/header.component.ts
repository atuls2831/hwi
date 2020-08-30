import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  private authLinstenerSubs: Subscription;
  userIsAuthenticated: boolean = false;
  userIsAdmin: boolean = false

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authLinstenerSubs = this.authService.
      getAuthStatusListener().
      subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userIsAdmin = this.authService.getUserId() === '5f49fbea181bfb08243ea815';
  }

  ngOnDestroy() {
    this.authLinstenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
