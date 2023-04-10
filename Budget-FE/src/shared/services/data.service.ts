import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {
  ICategory,
  ITransactionsGroup,
} from 'src/features/transactions/models';
import { ISettings } from 'src/main/models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  settings!: ISettings;
  categories: ICategory[] = [];
  categoriesSubject: ReplaySubject<ICategory[]> = new ReplaySubject();
  transactionsGroups: ITransactionsGroup[] = [];
  transactionsGroupsSubject: ReplaySubject<ITransactionsGroup[]> =
    new ReplaySubject();

  constructor() {}
}
