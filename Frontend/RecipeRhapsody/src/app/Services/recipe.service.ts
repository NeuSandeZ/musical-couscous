import { Injectable } from '@angular/core';
import { IRecipe } from '../Models/irecipe';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipes: IRecipe[] = [];

  constructor(private readonly _httpClient: HttpClient) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number): IRecipe {
    return this.recipes[index];
  }

  baseUrl: string = 'http://localhost:5162';

  addRecipe(recipe: IRecipe) {
    this._httpClient
      .post(this.baseUrl + '/recipe/add-recipe', recipe)
      .subscribe(
        (resData) => {
          console.log('resData :>> ', resData);
        },
        (error) => {
          console.log(error);
        }
      );
    // this.recipes.push(recipe);
  }

  addPhoto(formData: FormData) {
    return this._httpClient.post<{ imageUrl: string }>(
      this.baseUrl + '/recipe/image',
      formData
    );
  }
}
