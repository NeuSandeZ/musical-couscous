import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

import { RecipesComponent } from '../recipes/recipes.component';
import { Router, RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    RecipesComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private _userSub!: Subscription;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  //TODO FIGURE OUT HOW TO OPEN MENU ON AND KEEP OPEN ON HOVEROVER
  // @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  // openMenu() {
  //   if (!this.menuTrigger.menuOpen) {
  //     this.menuTrigger.openMenu();
  //   }
  // }

  // closeMenu() {
  //   if (this.menuTrigger.menuOpen) {
  //     this.menuTrigger.closeMenu();
  //   }
  // }

  ngOnDestroy(): void {
    this._userSub.unsubscribe();
  }

  ngOnInit(): void {
    this._userSub = this._authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  navigateTo(route: string) {
    this._router.navigate([route]);
  }

  onLogInOut() {
    if (!this.isAuthenticated) {
      this.navigateToLogin();
    } else {
      this.navigateToLogin();
      this._authService.logout();
    }
  }

  private navigateToLogin() {
    this._router.navigate(['/login']);
  }
}
