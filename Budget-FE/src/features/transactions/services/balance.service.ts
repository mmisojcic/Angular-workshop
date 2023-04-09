import { Injectable } from '@angular/core';

import { DataService } from 'src/shared/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private dataService: DataService) {}

  calculateBalance() {
    let income = 0;
    let expense = 0;

    this.dataService.transactionsGroups.forEach((transactionsGroup) => {
      income += transactionsGroup.income;
      expense += transactionsGroup.expense;
    });

    const amount = income - expense;
    const plannedBudget = this.dataService.settings.budgetAmount;
    const remainingBudget = plannedBudget - expense;
    const spentBudgetPercentage = (expense / plannedBudget) * 100;
    const [startDate, endDate] = this.setDateRange(
      this.dataService.settings.day
    );

    this.dataService.balanceSubject.next({
      startDate,
      endDate,
      income,
      expense,
      amount,
      plannedBudget,
      remainingBudget,
      spentBudgetPercentage,
    });
  }

  setDateRange(day: number): Date[] {
    const today = new Date();
    let startMonth;
    let endMonth;

    if (today.getDate() <= day) {
      startMonth = today.getMonth() - 1;
      endMonth = today.getMonth();
    } else {
      startMonth = today.getMonth();
      endMonth = today.getMonth() + 1;
    }

    var startDate = new Date(today.getFullYear(), startMonth, day);
    var endDate = new Date(today.getFullYear(), endMonth, day - 1);

    return [startDate, endDate];
  }
}
