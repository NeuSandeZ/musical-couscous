import { Injectable } from '@angular/core';
import { Recipe } from '../Models/recipe';
import { Ingredient } from '../Models/ingredient';
import { Step } from '../Models/step';

import { PrepTime } from '../Models/prepTime';
@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipes: Recipe[] = [
    {
      createdBy: 'NeuSandeZ',
      updatedOn: new Date(Date.now()),
      imgUrl:
        'https://th.bing.com/th/id/R.53ca01338a806e9082a1233cb0e7eff1?rik=NfDHpY%2ftRQXaLQ&pid=ImgRaw&r=0',
      title: 'Baklazan',
      category: 'Owoce i warzywa',
      description: 'test desc',
      ingredients: [
        new Ingredient('5 apples'),
        new Ingredient('1/4 scoop of protein'),
      ],
      steps: [
        new Step('Cut apples asdasd asdasd asd asd ads ad as'),
        new Step('Shake proteins'),
        new Step('Shake proteins'),
      ],
      prepTime: [
        new PrepTime('Prep Time', 15),
        new PrepTime('Cook Time', 15),
        new PrepTime('Total Time', 30),
        new PrepTime('Servings', 4),
        new PrepTime('Servings', 4),
      ],
    },
    {
      createdBy: 'NeuSandeZ',
      imgUrl:
        'https://th.bing.com/th/id/R.53ca01338a806e9082a1233cb0e7eff1?rik=NfDHpY%2ftRQXaLQ&pid=ImgRaw&r=0',
      title: 'Baklazan',
      category: 'Owoce i warzywa',
      description: 'test desc',
      ingredients: [],
      steps: [],
      prepTime: [],
    },
    {
      createdBy: 'NeuSandeZ',
      imgUrl:
        'https://th.bing.com/th/id/R.53ca01338a806e9082a1233cb0e7eff1?rik=NfDHpY%2ftRQXaLQ&pid=ImgRaw&r=0',
      title: 'Baklazan',
      category: 'Owoce i warzywa',
      description: 'test desc',
      ingredients: [],
      steps: [],
      prepTime: [],
    },
    {
      createdBy: 'NeuSandeZ',
      imgUrl:
        'https://th.bing.com/th/id/R.53ca01338a806e9082a1233cb0e7eff1?rik=NfDHpY%2ftRQXaLQ&pid=ImgRaw&r=0',
      title: 'Baklazan',
      category: 'Owoce i warzywa',
      description: 'test desc',
      ingredients: [],
      steps: [],
      prepTime: [],
    },
    {
      createdBy: 'NeuSandeZ',
      imgUrl:
        'https://th.bing.com/th/id/R.53ca01338a806e9082a1233cb0e7eff1?rik=NfDHpY%2ftRQXaLQ&pid=ImgRaw&r=0',
      title: 'Baklazan',
      category: 'Owoce i warzywa',
      description: 'test desc',
      ingredients: [],
      steps: [],
      prepTime: [],
    },
    {
      createdBy: 'NeuSandeZ',
      imgUrl:
        'https://th.bing.com/th/id/R.53ca01338a806e9082a1233cb0e7eff1?rik=NfDHpY%2ftRQXaLQ&pid=ImgRaw&r=0',
      title: 'Baklazan',
      category: 'Owoce i warzywa',
      description: 'test desc',
      ingredients: [],
      steps: [],
      prepTime: [],
    },
    {
      createdBy: 'NeuSandeZ',
      imgUrl:
        'https://th.bing.com/th/id/R.53ca01338a806e9082a1233cb0e7eff1?rik=NfDHpY%2ftRQXaLQ&pid=ImgRaw&r=0',
      title: 'Baklazan',
      category: 'Owoce i warzywa',
      description: 'test desc',
      ingredients: [],
      steps: [],
      prepTime: [],
    },
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }
}
