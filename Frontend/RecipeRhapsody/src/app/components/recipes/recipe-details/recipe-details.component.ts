import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { RecipeService } from '../../../Services/recipe.service';
import { IRecipe } from '../../../Models/irecipe';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [MatButtonModule, MatExpansionModule, MatIconModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  recipe!: IRecipe;
  id!: number;
  recipeSub!: Subscription;

  constructor(
    @Inject('BASE_URL') public baseUrl: string,
    private readonly _recipeService: RecipeService,
    private readonly _actRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

  ngOnInit(): void {
    this._actRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.recipeSub = this._recipeService
      .fetchRecipe(this.id)
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }
}
