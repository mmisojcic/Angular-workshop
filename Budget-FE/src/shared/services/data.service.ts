import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

import {
  IBalance,
  ITransactionsGroup,
  ICategory,
} from 'src/features/transactions/models';
import { ISettings } from 'src/main/models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  balanceSubject: Subject<IBalance> = new Subject();
  transactionsGroups: ITransactionsGroup[] = [];
  transactionsGroupsSubject: ReplaySubject<ITransactionsGroup[]> =
    new ReplaySubject();
  categories: ICategory[] = [];
  categoriesSubject: ReplaySubject<ICategory[]> = new ReplaySubject();
  settings!: ISettings;

  constructor() {}
}
