import { Component, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { RecipeService } from '../../../Services/recipe.service';
import { IRecipe } from '../../../Models/irecipe';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [MatButtonModule, MatExpansionModule, MatIconModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: IRecipe;
  id!: number;

  constructor(
    private readonly _recipeService: RecipeService,
    private readonly _actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._actRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.recipe = this._recipeService.getRecipe(this.id);
  }
}
