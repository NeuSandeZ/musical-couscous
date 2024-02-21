import { Inject, Injectable } from '@angular/core';
import { IRecipe } from '../Models/irecipe';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IRecipeListing } from '../Models/irecipeListing';
@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipes: IRecipeListing[] = [];
  // recipesChanged = new Subject<IRecipe[]>();

  constructor(
    @Inject('BASE_URL') public baseUrl: string,
    private readonly _httpClient: HttpClient
  ) {}

  addRecipe(recipe: IRecipe) {
    return this._httpClient.post<{ created: boolean }>(
      this.baseUrl + '/recipe/add-recipe',
      recipe
    );
    // this.recipes.push(recipe);
  }

  addPhoto(formData: FormData) {
    return this._httpClient.post<{ imageUrl: string }>(
      this.baseUrl + '/recipe/image',
      formData
    );
  }

  fetchRecipes() {
    return this._httpClient.get<IRecipeListing[]>(
      this.baseUrl + '/recipe/fetchRecipes'
    );
  }

  fetchRecipe(id: number) {
    return this._httpClient.get<IRecipe>(this.baseUrl + '/recipe/' + id);
  }
}
