import { Pipe, PipeTransform } from '@angular/core';

import { TransactionType } from 'src/features/transactions/models';

@Pipe({
  name: 'budgetAmount',
})
export class BudgetAmountPipe implements PipeTransform {
  transform(value: number | undefined, transactionType?: string): string {
    if (value) {
      const formattedNum = value.toFixed(2);
      const parts = formattedNum.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      const result = parts.join(',');
      const symbol = transactionType
        ? transactionType === TransactionType.Expense
          ? '-'
          : '+'
        : '';

      return `${symbol}${result} RSD`;
    } else {
      return '';
    }
  }
}
