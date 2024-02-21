import { Component, OnInit } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Dialog } from '@angular/cdk/dialog';
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
import { firstValueFrom } from 'rxjs';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
import { Router } from '@angular/router';
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

  ngOnDestroy(): void {}

  constructor(
    private readonly _recipeService: RecipeService,
    private readonly _navigator: Router,
    public dialog: Dialog
  ) {}

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
      new FormControl('e.g. 2 spoons of sugar powder', Validators.required),
      new FormControl('e.g. 1 cup of flour', Validators.required),
      new FormControl('e.g. 2 eggs', Validators.required),
    ]);
    let steps = new FormArray([
      new FormControl(
        'e.g. Preheat oven to 350degrees C...',
        Validators.required
      ),
      new FormControl(
        'e.g. Combine all dry ingredients in a large bowl..',
        Validators.required
      ),
    ]);
    let prepTimes = new FormArray([
      new FormGroup({
        title: new FormControl('Prep Time', Validators.required),
        time: new FormControl(Validators.required),
        unit: new FormControl(Validators.required),
      }),
      new FormGroup({
        title: new FormControl('Cook Time', Validators.required),
        time: new FormControl(Validators.required),
        unit: new FormControl(Validators.required),
      }),
    ]);

    this.recipeForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      imageFile: new FormControl(recipeImg!),
      servings: new FormControl(servings, Validators.required),
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

  async onSubmit() {
    let imageUrl!: string;

    if (this.selectedFile) {
      const form = new FormData();
      form.append('imageFile', this.selectedFile);
      imageUrl = (await firstValueFrom(this._recipeService.addPhoto(form)))
        .imageUrl;
    }

    const recipe: IRecipe = {
      imageUrl: imageUrl,
      servings: this.recipeForm.value.servings,
      servingsYield: this.recipeForm.value.servingsYield,
      title: this.recipeForm.value.title,
      description: this.recipeForm.value.description,
      ingredients: this.recipeForm.value.ingredients,
      steps: this.recipeForm.value.steps,
      prepTimes: this.recipeForm.value.prepTimes,
    };
    this._recipeService.addRecipe(recipe).subscribe({
      next: (resData) => {
        if (resData.created) {
          //TODO maybe pass some variable changing background to indicate the error?
          //TODO style the dialog window
          const dialogRef = this.dialog.open<string>(DialogWindowComponent, {
            data: { paragraph: 'Successfully created recipe:' + recipe.title },
          });
          dialogRef.closed.subscribe(() => {
            this._navigator.navigate(['/recipes']);
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
