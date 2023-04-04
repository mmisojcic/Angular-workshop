import { Component, Input } from '@angular/core';

import { ITransaction, TransactionTypeIcon } from '../../models';

@Component({
  selector: 'budget-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  @Input() set transaction(transaction: ITransaction) {
    this.fontIcon =
      TransactionTypeIcon[
        transaction.category?.type as keyof typeof TransactionTypeIcon
      ];
    this._transaction = transaction;
    console.log(transaction);
  }
  fontIcon: string = '';
  _transaction!: ITransaction;
}
