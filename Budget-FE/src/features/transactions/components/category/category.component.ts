import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { CategoryFormComponent } from '../category-form/category-form.component';
import { ICategory, TransactionTypeIcon } from '../../models';

@Component({
  selector: 'budget-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() set category(category: ICategory) {
    this.fontIcon = this.fontIcon =
      TransactionTypeIcon[category.type as keyof typeof TransactionTypeIcon];
    this._category = category;
  }
  _category!: ICategory;
  fontIcon: string = '';
  constructor(private bottomSheet: MatBottomSheet) {}

  onCategory() {
    this.bottomSheet.open(CategoryFormComponent, {
      panelClass: 'bottom-sheet',
      data: this._category,
    });
  }
}
