import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IRecipeListing } from '../../../Models/irecipeListing';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: IRecipeListing;

  constructor(@Inject('BASE_URL') public baseUrl: string) {}

  ngOnInit(): void {
    // this.recipe = this._recipeService.getRecipe(this.index);
  }
}
