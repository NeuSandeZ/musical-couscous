import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../../../Services/recipe.service';
import { Subscription } from 'rxjs';
import { IRecipeListing } from '../../../Models/irecipeListing';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import {
  DialogEnum,
  DialogWindowComponent,
} from '../../shared/dialog-window/dialog-window.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-recipes',
  standalone: true,
  imports: [],
  templateUrl: './user-recipes.component.html',
  styleUrl: './user-recipes.component.css',
})
export class UserRecipesComponent implements OnInit, OnDestroy {
  fetchSub!: Subscription;
  recipes!: IRecipeListing[];
  constructor(
    private readonly _recipeService: RecipeService,
    @Inject('BASE_URL') public baseUrl: string,
    private readonly _navigator: Router,
    private dialog: Dialog,
    private readonly _toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.fetchSub.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchSub = this._recipeService
      .fetchRecipes({ userRecipes: true })
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  navigate(id: number) {
    this._navigator.navigate(['/recipes/' + id]);
  }

  onEdit(recipeId: number) {
    this._recipeService.bhSubject.next({ isEditMode: true, recipeId });
    this._navigator.navigate(['/account/add-recipe/']);
  }

  onDelete(recipeId: number) {
    const dialogRef = this.dialog.open<string>(DialogWindowComponent, {
      data: {
        paragraph: 'Are you sure you want to delete?',
        enum: DialogEnum.Deleted,
      },
    });
    dialogRef.closed.subscribe((result) => {
      if (result) {
        this._recipeService.deleteRecipe(recipeId).subscribe(() => {
          this.recipes = this.recipes.filter(
            (recipe) => recipe.id !== recipeId
          );
          this._toastr.warning('Recipe deleted!');
        });
        //TODO ERROR?
      }
    });
  }
}
