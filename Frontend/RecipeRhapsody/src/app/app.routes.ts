import { CanActivateFn, Router, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PersonalInfoComponent } from './components/profile/personal-info/personal-info.component';
import { inject } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { map, take } from 'rxjs';

export const canActiveIfLoggedIn: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user.pipe(
    take(1),
    map((user) => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(['/login']);
    })
  );
};

export const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeListComponent },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './components/recipes/recipe-details/recipe-details.component'
          ).then((com) => com.RecipeDetailsComponent),
      },
    ],
  },
  {
    path: 'account/add-recipe',
    loadComponent: () =>
      import('./components/recipes/recipe-add/recipe-add.component').then(
        (com) => com.RecipeAddComponent
      ),
    canActivate: [canActiveIfLoggedIn],
  },
  {
    path: 'account/profile',
    component: ProfileComponent,
    canActivate: [canActiveIfLoggedIn],
    canActivateChild: [canActiveIfLoggedIn],
    children: [
      { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
      { path: 'personal-info', component: PersonalInfoComponent },
      {
        path: 'collections',
        loadComponent: () =>
          import('./components/profile/saved-items/saved-items.component').then(
            (com) => com.SavedItemsComponent
          ),
      },
      {
        path: 'my-recipes',
        loadComponent: () =>
          import(
            './components/recipes/user-recipes/user-recipes.component'
          ).then((com) => com.UserRecipesComponent),
      },
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
