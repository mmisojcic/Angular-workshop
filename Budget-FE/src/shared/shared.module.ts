import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetAmountPipe } from './pipes/budget-amount.pipe';

@NgModule({
  declarations: [BudgetAmountPipe],
  imports: [CommonModule],
  exports: [BudgetAmountPipe],
})
export class SharedModule {}
