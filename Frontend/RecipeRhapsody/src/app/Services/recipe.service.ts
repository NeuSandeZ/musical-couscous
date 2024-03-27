import { Inject, Injectable } from '@angular/core';
import { IRecipe } from '../Models/irecipe';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IPagedResult } from '../Models/ipagedresult';
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
    return this._httpClient.post(this.baseUrl + '/recipe/add-recipe', recipe, {
      observe: 'response',
    });
  }

  addPhoto(formData: FormData) {
    return this._httpClient.post<{ imageUrl: string }>(
      this.baseUrl + '/recipe/image',
      formData
    );
  }

  addToFavourites(recipeId: number) {
    return this._httpClient.post(this.baseUrl + '/favorite/' + recipeId, {
      observe: 'response',
    });
  }

  deleteFavorite(recipeId: number) {
    return this._httpClient.delete(this.baseUrl + '/favorite/' + recipeId, {
      observe: 'response',
    });
  }

  deleteRecipe(recipeId: number) {
    return this._httpClient.delete(
      this.baseUrl + '/recipe/' + recipeId + '/delete',
      {
        observe: 'response',
      }
    );
  }

  patchRecipe(recipe: IRecipe) {
    return this._httpClient.patch(this.baseUrl + '/recipe/patch', recipe, {
      observe: 'response',
    });
  }

  fetchRecipes(queryParams?: { [key: string]: string | number | boolean }) {
    let httpParams!: HttpParams;
    if (queryParams) {
      httpParams = new HttpParams();
      Object.keys(queryParams).forEach((key) => {
        httpParams = httpParams.append(key, queryParams[key].toString());
      });
    }

    return this._httpClient.get<IPagedResult>(
      this.baseUrl + '/recipe/fetchRecipes',
      { params: httpParams }
    );
  }

  fetchRecipe(id?: number) {
    return this._httpClient.get<IRecipe>(this.baseUrl + '/recipe/' + id);
  }
}
