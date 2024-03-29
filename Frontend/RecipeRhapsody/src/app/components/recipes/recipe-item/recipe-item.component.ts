import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IRecipeListing } from '../../../Models/irecipeListing';
import { RecipeService } from '../../../Services/recipe.service';
import { Observable, Subscription, firstValueFrom, take, tap } from 'rxjs';
import { AuthService } from '../../../Services/auth.service';
import { Dialog } from '@angular/cdk/dialog';
import {
  DialogEnum,
  DialogWindowComponent,
} from '../../shared/dialog-window/dialog-window.component';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent implements OnInit, OnDestroy {
  @Input() recipe!: IRecipeListing;
  private _userSub?: Subscription;

  constructor(
    @Inject('BASE_URL') public baseUrl: string,
    private readonly _recipeService: RecipeService,
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private dialog: Dialog
  ) {}

  ngOnDestroy(): void {
    this._userSub?.unsubscribe();
  }

  ngOnInit(): void {}

  async addToFavourites(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    let isAuthenticated;
    let continueExecuting: boolean | undefined = true;

    this._userSub = this._authService.user.subscribe((user) => {
      isAuthenticated = !!user;
    });

    if (!isAuthenticated) {
      const dialogRef = this.dialog.open<boolean>(DialogWindowComponent, {
        data: {
          paragraph: 'Create account to add to favorites! Take me to register:',
          enum: DialogEnum.Deleted,
        },
      });
      await firstValueFrom(
        dialogRef.closed.pipe(
          tap((res) => {
            if (res) {
              this._router.navigate(['/login']);
              continueExecuting = false;
            } else {
              continueExecuting = res;
            }
          })
        )
      );
    } else {
      this.recipe.isFavorite = !this.recipe.isFavorite;
    }

    if (!continueExecuting) {
      return;
    }

    let favoriteObs: Observable<any>;

    if (!this.recipe.isFavorite) {
      favoriteObs = this._recipeService.deleteFavorite(this.recipe.id);
    } else {
      favoriteObs = this._recipeService.addToFavourites(this.recipe.id);
    }

    favoriteObs.subscribe({
      next: (result) => {
        let dialogRef;
        if (result) {
          dialogRef = this.dialog.open<boolean>(DialogWindowComponent, {
            data: {
              paragraph: 'Successfully deleted recipe from favourites!',
              enum: DialogEnum.Updated,
            },
          });
        } else {
          dialogRef = this.dialog.open<boolean>(DialogWindowComponent, {
            data: {
              paragraph:
                'Successfully added recipe to favourites! Go to favourites:',
              enum: DialogEnum.Deleted,
            },
          });
          dialogRef.closed.subscribe((result) => {
            if (result) {
              this._router.navigate(['account/profile/collections']);
            }
          });
        }
      },
      error: (error) => {
        console.log('error :>> ', error);
      },
    });
  }
}
