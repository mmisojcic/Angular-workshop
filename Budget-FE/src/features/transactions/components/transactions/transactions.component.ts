import { Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ITransactionsGroup } from '../../models';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'budget-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactionsGroups: ITransactionsGroup[] = [];
  transactionsGroupsSubscription: Subscription = new Subscription();

  constructor(
    private bottomSheet: MatBottomSheet,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.transactionsGroupsSubscription =
      this.transactionsService.transactionsGroupsSubject.subscribe({
        next: (res) => {
          this.transactionsGroups = res;
        },
      });
  }

  ngOnDestroy(): void {
    this.transactionsGroupsSubscription.unsubscribe();
  }

  onNewTransaction() {
    this.bottomSheet.open(TransactionFormComponent, {
      panelClass: 'bottom-sheet',
    });
  }
}
