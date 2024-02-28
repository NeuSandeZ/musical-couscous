import { Inject, Injectable } from '@angular/core';
import { IRecipe } from '../Models/irecipe';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IRecipeListing } from '../Models/irecipeListing';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class RecipeService {
  // recipes: IRecipeListing[] = [];
  // recipesChanged = new Subject<IRecipe[]>();
  bhSubject = new BehaviorSubject<{
    isEditMode: boolean;
    recipeId: number;
  }>(null!);

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

  deleteRecipe(recipeId: number) {
    return this._httpClient.delete(
      this.baseUrl + '/recipe/' + recipeId + '/delete'
    );
  }

  patchRecipe(recipe: IRecipe) {
    return this._httpClient.patch<{ updated: boolean }>(
      this.baseUrl + '/recipe/patch',
      recipe
    );
  }

  fetchRecipes(queryParams?: { [key: string]: string | number | boolean }) {
    let httpParams!: HttpParams;
    if (queryParams) {
      httpParams = new HttpParams();
      Object.keys(queryParams).forEach((key) => {
        httpParams = httpParams.append(key, queryParams[key].toString());
      });
    }

    return this._httpClient.get<IRecipeListing[]>(
      this.baseUrl + '/recipe/fetchRecipes',
      { params: httpParams }
    );
  }

  fetchRecipe(id?: number) {
    return this._httpClient.get<IRecipe>(this.baseUrl + '/recipe/' + id);
  }
}
