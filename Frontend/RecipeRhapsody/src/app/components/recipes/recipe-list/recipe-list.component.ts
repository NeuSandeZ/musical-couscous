import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
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
  recipes: IRecipeListing[] = [];
  recipeSub!: Subscription;
  isLoading: boolean = false;
  isError: boolean = false;
  private pageSize: number = 8;
  private totalRecords!: number;
  private skipCount: number = 0;
  private isFetching: boolean = false;

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
      });
    }
  }

  constructor(private readonly _recipesService: RecipeService) {}

  ngOnInit(): void {
    this.fetchRecipes();
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

  private fetchRecipes(queryParams?: {
    [key: string]: string | number | boolean;
  }) {
    this.isFetching = true;
    this.isLoading = true;
    this.recipeSub = this._recipesService.fetchRecipes(queryParams).subscribe({
      next: (result) => {
        this.isError = false;
        this.totalRecords = result.totalRecords;
        this.recipes.push(...result.collection);
        this.skipCount += result.collection.length;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
      },
      complete: () => {
        this.isFetching = false;
      },
    });
  }
}
