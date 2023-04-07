import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { environment } from 'environments/environment';
import { ITransaction, ITransactionsGroup, TransactionType } from '../models';
import { DataService } from 'src/shared/services/data.service';
import { BalanceService } from './balance.service';
import { sortArrayByField } from 'src/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  endpoint: string = 'api/Transaction';

  constructor(
    private http: HttpClient,
    private balanceService: BalanceService,
    private dataService: DataService
  ) {}

  add(category: ITransaction) {
    this.http
      .post<ITransaction>(
        `${environment.serverUrl}/${this.endpoint}/Add`,
        category
      )
      .subscribe({
        next: (res) => {
          this.getAll(this.dataService.settings.day);
        },
      });
  }

  getAll(day?: number) {
    const pathParam: string = day ? `/${day}` : '';

    this.http
      .get<ITransaction[]>(
        `${environment.serverUrl}/${this.endpoint}/GetAll${pathParam}`
      )
      .pipe<ITransactionsGroup[]>(
        map((res) =>
          sortArrayByField(this.mapTransactionsToGroups(res), 'date')
        )
      )
      .subscribe({
        next: (data) => {
          this.dataService.transactionsGroups = data;
          this.dataService.transactionsGroupsSubject.next(data);
          this.balanceService.calculateBalance();
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
          this.getAll(this.dataService.settings.day);
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
      const category = this.dataService.categories.find(
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
