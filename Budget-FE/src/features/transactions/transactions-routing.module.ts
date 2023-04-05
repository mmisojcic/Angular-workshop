import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsRoute } from 'src/shared/models';

import { CategoriesComponent } from './components/categories/categories.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BalanceComponent } from './components/balance/balance.component';

const routes: Routes = [
  {
    path: '',
    component: BalanceComponent,
    children: [
      {
        path: '',
        redirectTo: `${TransactionsRoute.Transactions}`,
        pathMatch: 'full',
      },
      {
        path: `${TransactionsRoute.Categories}`,
        component: CategoriesComponent,
      },
      {
        path: `${TransactionsRoute.Transactions}`,
        component: TransactionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
