import { IRecipeListing } from './irecipeListing';

export interface IPagedResult {
  collection: IRecipeListing[];
  totalRecords: number;
}
