import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IBalance, ITransactionsGroup } from '../models';
import { ISettings } from 'src/main/models';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  balance!: IBalance;
  balanceSubject: Subject<IBalance> = new Subject();

  constructor() {}

  calculateBalance(
    transactionsGroups: ITransactionsGroup[],
    settings: ISettings
  ) {
    let income = 0;
    let expense = 0;

    transactionsGroups.forEach((transactionsGroup) => {
      income += transactionsGroup.income;
      expense += transactionsGroup.expense;
    });

    const amount = income - expense;
    const plannedBudget = settings.budgetAmount;
    const remainingBudget = plannedBudget - expense;
    const spentBudgetPercentage = (expense / plannedBudget) * 100;

    this.balanceSubject.next({
      income,
      expense,
      amount,
      plannedBudget,
      remainingBudget,
      spentBudgetPercentage,
    });
  }
}
