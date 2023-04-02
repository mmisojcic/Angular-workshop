import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { AngularMaterialModule } from 'src/shared/angular-material.module';

@NgModule({
  declarations: [
    CategoriesComponent,
    TransactionsComponent,
    CategoryComponent,
    CategoryFormComponent,
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxMatColorPickerModule,
  ],
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
})
export class TransactionsModule {}
