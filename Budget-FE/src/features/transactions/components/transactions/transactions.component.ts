import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ITransactionsGroup } from '../../models';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { DataService } from 'src/shared/services/data.service';

@Component({
  selector: 'budget-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  transactionsGroups: ITransactionsGroup[] = [];
  transactionsGroupsSubscription: Subscription = new Subscription();

  constructor(
    private bottomSheet: MatBottomSheet,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.transactionsGroupsSubscription =
      this.dataService.transactionsGroupsSubject.subscribe({
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
