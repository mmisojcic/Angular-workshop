import { Injectable } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { ITransaction, ITransactionsGroup, TransactionType } from '../models';
import { CategoriesService } from './categories.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  endpoint: string = 'api/Transaction';
  transactionsGroups: ITransactionsGroup[] = [];
  transactionsGroupsSubject: ReplaySubject<ITransactionsGroup[]> =
    new ReplaySubject();

  constructor(
    private http: HttpClient,
    private categoriesService: CategoriesService
  ) {}

  add(category: ITransaction) {
    this.http
      .post<ITransaction>(
        `${environment.serverUrl}/${this.endpoint}/Add`,
        category
      )
      .subscribe({
        next: (res) => {
          this.getAll();
        },
      });
  }

  getAll() {
    this.http
      .get<ITransaction[]>(`${environment.serverUrl}/${this.endpoint}/GetAll`)
      .pipe(map((res) => this.mapTransactionsToGroups(res)))
      .subscribe({
        next: (res) => {
          this.transactionsGroupsSubject.next(res);
          this.transactionsGroups = res;
        },
      });
  }

  update(transaction: ITransaction) {
    this.http
      .put<ITransaction>(
        `${environment.serverUrl}/${this.endpoint}/Update`,
        transaction
      )
      .subscribe({
        next: (res) => {
          this.getAll();
        },
      });
  }

  processFormRequest(transaction: ITransaction) {
    if (transaction.id) {
      this.update(transaction);
    } else {
      this.add(transaction);
    }
  }

  mapTransactionsToGroups(transactions: ITransaction[]): ITransactionsGroup[] {
    return transactions.reduce((acc: ITransactionsGroup[], transaction) => {
      const { categoryId, date, amount } = transaction;
      const category = this.categoriesService.categories.find(
        (category) => category.id === categoryId
      );
      const existingGroupIndex = acc.findIndex((group) => group.date === date);

      if (existingGroupIndex > -1) {
        acc[existingGroupIndex].transactions.push({
          ...transaction,
          category,
        });

        if (category?.type === TransactionType.Income) {
          acc[existingGroupIndex].income += amount;
        }
        if (category?.type === TransactionType.Expense) {
          acc[existingGroupIndex].expense += amount;
        }
      } else {
        acc.push({
          date,
          income: category?.type === TransactionType.Income ? amount : 0,
          expense: category?.type === TransactionType.Expense ? amount : 0,
          transactions: [{ ...transaction, category }],
        });
      }
      return acc;
    }, []);
  }
}
