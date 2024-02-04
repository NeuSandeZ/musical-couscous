import { Component, OnInit } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeItemComponent, RouterOutlet],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {

  ngOnInit(): void {
  }
}
