import { Component, Input } from '@angular/core';

import { ITransaction, TransactionType } from '../../models';

@Component({
  selector: 'budget-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  @Input() set transaction(transaction: ITransaction) {
    this.fontIcon =
      transaction.category?.type === TransactionType.Expense
        ? 'arrow_upward'
        : 'arrow_downward';
    this._transaction = transaction;
  }
  _transaction!: ITransaction;
  fontIcon: string = '';
}
