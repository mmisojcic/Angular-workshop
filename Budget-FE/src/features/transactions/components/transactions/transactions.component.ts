import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ITransactionsGroup } from '../../models';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { BalanceService } from '../../services/balance.service';
import { SettingsService } from 'src/main/services/settings.service';

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
    private transactionsService: TransactionsService,
    private balanceService: BalanceService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.transactionsGroupsSubscription =
      this.transactionsService.transactionsGroupsSubject.subscribe({
        next: (res) => {
          this.transactionsGroups = res;
          this.balanceService.calculateBalance(
            res,
            this.settingsService.settings
          );
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
