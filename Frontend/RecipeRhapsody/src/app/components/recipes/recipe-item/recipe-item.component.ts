import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RecipeService } from '../../../Services/recipe.service';
import { Recipe } from '../../../Models/recipe';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent implements OnInit {
  recipe!: Recipe;
  @Input() index!: number;

  constructor(
    private readonly _recipeService: RecipeService,
  ) {}

  ngOnInit(): void {
    this.recipe = this._recipeService.getRecipe(this.index);
  }
}
