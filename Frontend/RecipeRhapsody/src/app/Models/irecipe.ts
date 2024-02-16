import { IPrepTime } from './iprepTime';

export interface IRecipe {
  imageUrl?: string;
  servings: number;
  servingsYield: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  prepTimes: IPrepTime[];

  createdBy?: string;
  updatedOn?: Date;
  imgUrl?: string;
  category?: string;
}
