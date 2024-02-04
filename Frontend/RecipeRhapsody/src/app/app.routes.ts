import { Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailsComponent } from './components/recipes/recipe-details/recipe-details.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { LoginAndRegisterComponent } from './components/login-and-register/login-and-register.component';

export const routes: Routes = [
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, 
  children:[
    {path: '', component: RecipeListComponent},
    {path: ':id', component: RecipeDetailsComponent}
  ]},
  {path: 'pipa', component: RecipeDetailsComponent},
  {path: 'login', component: LoginAndRegisterComponent}
];
