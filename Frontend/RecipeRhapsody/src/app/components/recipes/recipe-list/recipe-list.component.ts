import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { RecipeService } from '../../../Services/recipe.service';
import { Subscription } from 'rxjs';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { IRecipeListing } from '../../../Models/irecipeListing';
import { AuthService } from '../../../Services/auth.service';
@Component({
  selector: 'app-recipe-list',
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  imports: [RecipeItemComponent, LoadingSpinnerComponent],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: IRecipeListing[] = [];
  recipeSub!: Subscription;
  isError: boolean = false;
  private pageSize: number = 8;
  private totalRecords!: number;
  private skipCount: number = 0;
  isFetching: boolean = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (
      window.scrollY >= scrollableHeight &&
      this.totalRecords > this.skipCount &&
      !this.isFetching
    ) {
      this.fetchRecipes({
        pageSize: this.pageSize,
        skipCount: this.skipCount,
        withFavorites: true,
      });
    }
  }

  constructor(
    private readonly _recipesService: RecipeService,
    private readonly _authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!!this._authService.user) {
      this.fetchRecipes({ withFavorites: true });
    } else {
      this.fetchRecipes();
    }
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

  private fetchRecipes(queryParams?: {
    [key: string]: string | number | boolean;
  }) {
    this.isFetching = true;
    this.recipeSub = this._recipesService.fetchRecipes(queryParams).subscribe({
      next: (result) => {
        this.isError = false;
        this.totalRecords = result.totalRecords;
        this.recipes.push(...result.collection);
        this.skipCount += result.collection.length;
        this.isFetching = false;
      },
      error: (error) => {
        this.isFetching = false;
        this.isError = true;
      },
      complete: () => {
        this.isFetching = false;
      },
    });
  }
}
