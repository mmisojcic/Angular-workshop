import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { IBalance } from '../../models';
import { TransactionsRoute } from 'src/shared/models';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'budget-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit, OnDestroy {
  links = TransactionsRoute;
  activeLink: string | undefined = '';
  balance!: IBalance;
  balanceSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private balanceService: BalanceService
  ) {}

  ngOnInit(): void {
    this.activeLink = this.activatedRoute.firstChild?.routeConfig?.path;

    this.balanceSubscription = this.balanceService.balanceSubject.subscribe({
      next: (res) => {
        this.balance = res;
      },
    });
  }

  ngOnDestroy(): void {
    this.balanceSubscription.unsubscribe();
  }

  onTabChange(link: TransactionsRoute) {
    this.activeLink = link;
    this.router.navigate([link], { relativeTo: this.activatedRoute });
  }
}
