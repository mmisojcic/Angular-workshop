import { Component, Input } from '@angular/core';

import { ICategory, TransactionType } from '../../models';

@Component({
  selector: 'budget-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() category!: ICategory;
  transactionType = TransactionType;
}
