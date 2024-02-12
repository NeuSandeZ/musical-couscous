import { Component, OnInit } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-recipe-add',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule],
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

  get controls() {
    return (<FormArray>this.recipeForm.get('recipeIngredients')).controls;
  }

  private initForm() {
    let recipeTitle = '';
    let recipeDescription = '';
    let recipeImg: File; // File or img url?
    let recipeIngredients = new FormArray([
      new FormControl(),
      new FormControl(),
    ]);
    let recipeSteps = new FormArray([]);

    this.recipeForm = new FormGroup({
      recipeTitle: new FormControl(recipeTitle),
      recipeDescription: new FormControl(recipeDescription),
      imageFile: new FormControl(recipeImg!),
      recipeIngredients: recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(
      new FormGroup({
        recipeIngredient: new FormControl(null, Validators.required),
      })
    );
  }
}
