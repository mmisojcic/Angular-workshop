import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { IBalance } from '../../models';
import { TransactionsRoute } from 'src/shared/models';
import { DataService } from 'src/shared/services/data.service';
import { TransactionsService } from '../../services/transactions.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'budget-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit, OnDestroy {
  links = TransactionsRoute;
  activeLink: string | undefined = '';
  balance!: IBalance | undefined;
  balanceSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private categoriesService: CategoriesService,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.activeLink = this.activatedRoute.firstChild?.routeConfig?.path;
    this.categoriesService.getAll().subscribe({
      next: (res) => {
        this.dataService.categoriesSubject.next(res);
        this.dataService.categories = res;
        this.transactionsService.getAll(this.dataService.settings.day);
      },
    });

    this.balanceSubscription = this.dataService.balanceSubject.subscribe({
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
