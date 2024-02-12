import { Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailsComponent } from './components/recipes/recipe-details/recipe-details.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeAddComponent } from './components/recipes/recipe-add/recipe-add.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SavedItemsComponent } from './components/profile/saved-items/saved-items.component';
import { PersonalInfoComponent } from './components/profile/personal-info/personal-info.component';

export const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeListComponent },
      { path: ':id', component: RecipeDetailsComponent },
    ],
  },
  { path: 'account/add-recipe', component: RecipeAddComponent },
  {
    path: 'account/profile',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
      { path: 'personal-info', component: PersonalInfoComponent },
      { path: 'collections', component: SavedItemsComponent },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import(
        './components/login-and-register/login-and-register.component'
      ).then((com) => com.LoginAndRegisterComponent),
  },
];
