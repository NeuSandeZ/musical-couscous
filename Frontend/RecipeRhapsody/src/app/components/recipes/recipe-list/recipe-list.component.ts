import { Component, OnInit } from '@angular/core';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { IRecipe } from '../../../Models/irecipe';
import { RecipeService } from '../../../Services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes!: IRecipe[];

  constructor(private readonly _recipesService: RecipeService) {}
  ngOnInit(): void {
    this.recipes = this._recipesService.getRecipes();
  }
}
