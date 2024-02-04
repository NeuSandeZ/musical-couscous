import { Component, ElementRef, ViewChild } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RecipesComponent } from '../recipes/recipes.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RecipesComponent,
    RouterModule,
    MatTabsModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

}
