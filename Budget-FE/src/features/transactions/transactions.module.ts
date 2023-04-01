import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

@NgModule({
  declarations: [CategoriesComponent, TransactionsComponent],
  imports: [CommonModule, TransactionsRoutingModule],
})
export class TransactionsModule {}
