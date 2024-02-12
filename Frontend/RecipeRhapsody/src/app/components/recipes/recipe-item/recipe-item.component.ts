import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RecipeService } from '../../../Services/recipe.service';
import { Recipe } from '../../../Models/recipe';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterLink , CommonModule],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent implements OnInit {
  recipe!: Recipe;
  @Input() index!: number;

  constructor(private readonly _recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipe = this._recipeService.getRecipe(this.index);
  }
}
