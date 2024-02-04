import { Ingredient } from './ingredient';
import { PrepTime } from './prepTime';
import { Step } from './step';

export class Recipe {
  createdBy!: string;
  updatedOn?: Date;
  imgUrl!: string;
  category!: string;
  title!: string;
  description!: string;
  ingredients!: Ingredient[];
  steps!: Step[];
  prepTime!: PrepTime[];

  constructor(
    createdBy: string,
    updatedOn: Date,
    imgUrl: string,
    category: string,
    title: string,
    description: string,
    ingredients: Ingredient[],
    steps: Step[],
    prepTime: PrepTime[]
  ) {
    this.imgUrl = imgUrl;
    this.category = category;
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.steps = steps;
    this.prepTime = prepTime;
    this.createdBy = createdBy;
    this.updatedOn = updatedOn;
  }
}
