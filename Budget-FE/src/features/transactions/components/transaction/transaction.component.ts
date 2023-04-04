import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ITransaction, TransactionTypeIcon } from '../../models';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

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
  }
  fontIcon: string = '';
  _transaction!: ITransaction;

  constructor(private bottomSheet: MatBottomSheet) {}

  onTransaction() {
    this.bottomSheet.open(TransactionFormComponent, {
      panelClass: 'bottom-sheet',
      data: this._transaction,
    });
  }
}
