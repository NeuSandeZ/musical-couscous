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

  selectedFile!: File;
  selectedFileUrl!: any;
  defaultImageSource: string =
    'https://th.bing.com/th/id/OIP.ilYQWb6p_RYzTqdDqoTjqAHaHa?w=198&h=198&c=7&r=0&o=5&pid=1.7';

  ngOnInit(): void {
    this.initForm();
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
    console.log(this.recipeForm);
  }

  get ingredientControls() {
    return (this.recipeForm.get('recipeIngredients') as FormArray).controls;
  }

  get stepControls() {
    return (this.recipeForm.get('recipeSteps') as FormArray).controls;
  }

  get prepTime() {
    return (this.recipeForm.get('recipePrepTime') as FormArray).controls;
  }

  private initForm() {
    let recipeTitle = '';
    let recipeDescription = '';
    let recipeImg: File; // File or img url?
    let recipeServings = '';
    let recipeServingsYield = '';
    let recipeIngredients = new FormArray([
      new FormControl('e.g. 2 spoons of sugar powder'),
      new FormControl('e.g. 1 cup of flour'),
      new FormControl('e.g. 2 eggs'),
    ]);
    let recipeSteps = new FormArray([
      new FormControl('e.g. Preheat oven to 350degrees C...'),
      new FormControl('e.g. Combine all dry ingredients in a large bowl..'),
    ]);
    let recipeTime = new FormArray([
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
      recipeTitle: new FormControl(recipeTitle, Validators.required),
      recipeDescription: new FormControl(
        recipeDescription,
        Validators.required
      ),
      imageFile: new FormControl(recipeImg!),
      recipeServings: new FormControl(recipeServings),
      recipeServingsYield: new FormControl(recipeServingsYield),
      recipeIngredients: recipeIngredients,
      recipeSteps: recipeSteps,
      recipePrepTime: recipeTime,
    });
  }

  onAddTime() {
    (this.recipeForm.get('recipePrepTime') as FormArray).push(
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
}
