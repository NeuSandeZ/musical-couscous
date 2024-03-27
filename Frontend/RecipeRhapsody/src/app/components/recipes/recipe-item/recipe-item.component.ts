import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IRecipeListing } from '../../../Models/irecipeListing';
import { RecipeService } from '../../../Services/recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: IRecipeListing;

  constructor(
    @Inject('BASE_URL') public baseUrl: string,
    private readonly _recipeService: RecipeService
  ) {}

  ngOnInit(): void {}

  addToFavourites(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    //TODO redirect to login/register if not logged in

    this.recipe.isFavorite = !this.recipe.isFavorite;

    let favoriteObs: Observable<any>;

    if (!this.recipe.isFavorite) {
      favoriteObs = this._recipeService.deleteFavorite(this.recipe.id);
    } else {
      favoriteObs = this._recipeService.addToFavourites(this.recipe.id);
    }

    favoriteObs.subscribe({
      next: (result) => {
        console.log('result :>> ', result);
      },
      error: (error) => {
        console.log('error :>> ', error);
      },
    });

    //TODO Display dialog or toast after successfull operation
  }
}
