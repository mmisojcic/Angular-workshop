import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';
import { InputMaskModule } from '@ngneat/input-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { BalanceComponent } from './components/balance/balance.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryComponent } from './components/category/category.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionsDateGroupComponent } from './components/transactions-date-group/transactions-date-group.component';

@NgModule({
  declarations: [
    BalanceComponent,
    CategoriesComponent,
    TransactionsComponent,
    CategoryFormComponent,
    CategoryComponent,
    TransactionFormComponent,
    TransactionComponent,
    TransactionsDateGroupComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMatColorPickerModule,
    InputMaskModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    InputMaskModule,
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'sr-RS' },
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class TransactionsModule {}
