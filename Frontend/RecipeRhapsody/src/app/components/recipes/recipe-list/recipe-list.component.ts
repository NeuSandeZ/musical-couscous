import { Component, OnInit } from '@angular/core';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { Recipe } from '../../../Models/recipe';
import { RecipeService } from '../../../Services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  recipes!: Recipe[];

  constructor(private readonly _recipesService: RecipeService) { }
  ngOnInit(): void {
    this.recipes = this._recipesService.getRecipes();
  }

}
