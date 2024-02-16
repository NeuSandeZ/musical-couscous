import { Component, OnInit } from '@angular/core';

import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RecipeService } from '../../../Services/recipe.service';
import { IRecipe } from '../../../Models/irecipe';
@Component({
  selector: 'app-recipe-add',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIcon,
    MatSelectModule,
  ],
  templateUrl: './recipe-add.component.html',
  styleUrl: './recipe-add.component.css',
})
export class RecipeAddComponent implements OnInit {
  recipeForm!: FormGroup;
  selectedFile?: File;
  selectedFileUrl!: string | ArrayBuffer | null | undefined;
  defaultImageSource: string =
    'https://th.bing.com/th/id/OIP.ilYQWb6p_RYzTqdDqoTjqAHaHa?w=198&h=198&c=7&r=0&o=5&pid=1.7';

  ngOnInit(): void {
    this.initForm();
  }

  constructor(private readonly _recipeService: RecipeService) {}

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get stepControls() {
    return (this.recipeForm.get('steps') as FormArray).controls;
  }

  get prepTimes() {
    return (this.recipeForm.get('prepTimes') as FormArray).controls;
  }

  private initForm() {
    let title = '';
    let description = '';
    let recipeImg: File;
    let servings = '';
    let servingsYield = '';
    let ingredients = new FormArray([
      new FormControl('e.g. 2 spoons of sugar powder'),
      new FormControl('e.g. 1 cup of flour'),
      new FormControl('e.g. 2 eggs'),
    ]);
    let steps = new FormArray([
      new FormControl('e.g. Preheat oven to 350degrees C...'),
      new FormControl('e.g. Combine all dry ingredients in a large bowl..'),
    ]);
    let prepTimes = new FormArray([
      new FormGroup({
        title: new FormControl('Prep Time'),
        time: new FormControl(),
        unit: new FormControl(),
      }),
      new FormGroup({
        title: new FormControl('Cook Time'),
        time: new FormControl(),
        unit: new FormControl(),
      }),
    ]);

    this.recipeForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      imageFile: new FormControl(recipeImg!),
      servings: new FormControl(servings),
      servingsYield: new FormControl(servingsYield),
      ingredients: ingredients,
      steps: steps,
      prepTimes: prepTimes,
    });
  }

  onAddTime() {
    (this.recipeForm.get('prepTimes') as FormArray).push(
      new FormGroup({
        title: new FormControl(),
        time: new FormControl(),
        unit: new FormControl(),
      })
    );
  }

  onDelete(index: number, controlName: string) {
    (this.recipeForm.get(controlName) as FormArray).removeAt(index);
  }

  onAdd(controlName: string, name: string) {
    (this.recipeForm.get(controlName) as FormArray).push(
      new FormControl('Add another ' + name, Validators.required)
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.selectedFileUrl = ev.target?.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    const form = new FormData();

    if (this.selectedFile) {
      form.append(
        'imageFile',
        new Blob([this.recipeForm.value.imageFile]),
        'myTestFileName' //TODO assigning unique name
      );
    }

    //TODO send ASYNC request with img

    const recipe: IRecipe = {
      servings: this.recipeForm.value.servings,
      servingsYield: this.recipeForm.value.servingsYield,
      title: this.recipeForm.value.title,
      description: this.recipeForm.value.description,
      ingredients: this.recipeForm.value.ingredients,
      steps: this.recipeForm.value.steps,
      prepTimes: this.recipeForm.value.prepTimes,
    };

    this._recipeService.addRecipe(recipe);
  }
}
