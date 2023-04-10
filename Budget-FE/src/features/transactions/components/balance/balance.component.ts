import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsRoute } from 'src/shared/models';
import { CategoriesService } from '../../services/categories.service';
import { DataService } from 'src/shared/services/data.service';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'budget-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit, OnDestroy {
  links = TransactionsRoute;
  activeLink: string | undefined = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private dataService: DataService,
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

    // this.balanceSubscription = this.dataService.balanceSubject.subscribe({
    //   next: (res) => {
    //     this.balance = res;
    //   },
    // });
  }

  ngOnDestroy(): void {
    // this.balanceSubscription.unsubscribe();
  }

  onTabChange(link: TransactionsRoute) {
    this.activeLink = link;
    this.router.navigate([link], { relativeTo: this.activatedRoute });
  }
}
