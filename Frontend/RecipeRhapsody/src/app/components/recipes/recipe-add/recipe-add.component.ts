import { Component, OnDestroy, OnInit } from '@angular/core';

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
import {
  BehaviorSubject,
  Observable,
  Subscription,
  firstValueFrom,
} from 'rxjs';
import {
  DialogEnum,
  DialogWindowComponent,
} from '../../shared/dialog-window/dialog-window.component';
import { ActivatedRoute, Router } from '@angular/router';
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
export class RecipeAddComponent implements OnInit, OnDestroy {
  recipeForm!: FormGroup;
  selectedFile?: File;
  private editModeSub!: Subscription;
  public isEditMode: boolean = false;
  private recipeId?: number;
  selectedFileUrl!: string | ArrayBuffer | null | undefined;
  defaultImageSource: string =
    'https://th.bing.com/th/id/OIP.ilYQWb6p_RYzTqdDqoTjqAHaHa?w=198&h=198&c=7&r=0&o=5&pid=1.7';

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.editModeSub.unsubscribe();
  }

  constructor(
    private readonly _recipeService: RecipeService,
    private readonly _navigator: Router,
    public dialog: Dialog,
    private readonly _route: ActivatedRoute
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
    //TODO this one probably needs refactor haha
    let title = '';
    let description = '';
    let recipeImg: File;
    let servings = '';
    let servingsYield = '';

    let ingredients;
    let steps;
    let prepTimes;

    this.editModeSub = this._recipeService.bhSubject.subscribe((value) => {
      this.recipeId = value?.recipeId;
      this.isEditMode = value?.isEditMode;
      this._recipeService.bhSubject.complete();
      this._recipeService.bhSubject = new BehaviorSubject<{
        isEditMode: boolean;
        recipeId: number;
      }>(null!);
    });

    if (!this.isEditMode) {
      ingredients = new FormArray([
        new FormControl('e.g. 2 spoons of sugar powder', Validators.required),
        new FormControl('e.g. 1 cup of flour', Validators.required),
        new FormControl('e.g. 2 eggs', Validators.required),
      ]);
      steps = new FormArray([
        new FormControl(
          'e.g. Preheat oven to 350degrees C...',
          Validators.required
        ),
        new FormControl(
          'e.g. Combine all dry ingredients in a large bowl..',
          Validators.required
        ),
      ]);
      prepTimes = new FormArray([
        new FormGroup({
          title: new FormControl('Prep Time', Validators.required),
          time: new FormControl(0, Validators.required),
          unit: new FormControl('', Validators.required),
        }),
        new FormGroup({
          title: new FormControl('Cook Time', Validators.required),
          time: new FormControl(0, Validators.required),
          unit: new FormControl('', Validators.required),
        }),
      ]);
    } else {
      ingredients = new FormArray<FormControl>([]);
      steps = new FormArray([]);
      prepTimes = new FormArray([]);
      this._recipeService.fetchRecipe(this.recipeId).subscribe((recipe) => {
        this.recipeForm.patchValue(recipe);
        //TODO 3 fors just doesn't look right but it works now REFACTOR
        for (const ingredient of recipe.ingredients) {
          ingredients.push(new FormControl(ingredient, Validators.required));
        }
        for (const step of recipe.steps) {
          steps.push(new FormControl(step, Validators.required));
        }
        for (const prepTime of recipe.prepTimes) {
          prepTimes.push(
            new FormGroup({
              title: new FormControl(prepTime.title, Validators.required),
              time: new FormControl(prepTime.time, Validators.required),
              unit: new FormControl(prepTime.unit, Validators.required),
            })
          );
        }
      });
    }

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

    //TODO if imageUrl = null load some default

    const recipe: IRecipe = {
      id: this.recipeId,
      imageUrl: imageUrl,
      servings: this.recipeForm.value.servings,
      servingsYield: this.recipeForm.value.servingsYield,
      title: this.recipeForm.value.title,
      description: this.recipeForm.value.description,
      ingredients: this.recipeForm.value.ingredients,
      steps: this.recipeForm.value.steps,
      prepTimes: this.recipeForm.value.prepTimes,
    };

    let request = new Observable<any>();

    if (this.isEditMode) {
      request = this._recipeService.patchRecipe(recipe);
    } else {
      request = this._recipeService.addRecipe(recipe);
    }

    request.subscribe({
      next: (resData) => {
        if (+resData.status === 201) {
          this.handleSuccess(
            'Successfully created recipe:' + recipe.title,
            '/recipes',
            DialogEnum.Created
          );
        } else if (+resData.status === 200) {
          this.handleSuccess(
            'Successfully updated recipe:' + recipe.title,
            '/account/profile/my-recipes',
            DialogEnum.Updated
          );
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private handleSuccess(
    message: string,
    navigateTo: string,
    state: DialogEnum
  ) {
    const dialogRef = this.dialog.open<string>(DialogWindowComponent, {
      data: { paragraph: message, enum: state },
    });
    dialogRef.closed.subscribe(() => {
      this._navigator.navigate([navigateTo]);
    });
  }
}
