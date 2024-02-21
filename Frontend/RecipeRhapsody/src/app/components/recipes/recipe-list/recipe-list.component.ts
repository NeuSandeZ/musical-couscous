import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { RecipeService } from '../../../Services/recipe.service';
import { Subscription } from 'rxjs';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { IRecipeListing } from '../../../Models/irecipeListing';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  imports: [RecipeItemComponent, LoadingSpinnerComponent],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: IRecipeListing[];
  recipeSub!: Subscription;
  isLoading: boolean = false;

  constructor(private readonly _recipesService: RecipeService) {}

  ngOnInit(): void {
    this.fetchRecipes();
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

  private fetchRecipes() {
    this.isLoading = true;
    this.recipeSub = this._recipesService.fetchRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        console.log('this.recipes :>> ', this.recipes);
        this.isLoading = false;
      },
    });
  }
}
