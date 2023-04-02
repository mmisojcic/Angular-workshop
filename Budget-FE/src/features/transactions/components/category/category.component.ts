import { Component, Input } from '@angular/core';

import { ICategory, TransactionType } from '../../models';

@Component({
  selector: 'budget-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() set category(category: ICategory) {
    this.fontIcon =
      category.type === TransactionType.Expense
        ? 'arrow_upward'
        : 'arrow_downward';
    this._category = category;
  }
  _category!: ICategory;
  fontIcon: string = '';
}
