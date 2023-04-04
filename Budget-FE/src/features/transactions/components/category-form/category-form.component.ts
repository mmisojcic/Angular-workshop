import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Color } from '@angular-material-components/color-picker';

import {
  ICategory,
  ICategoryFrom,
  TransactionType,
  TransactionTypeSelect,
} from '../../models';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'budget-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup<ICategoryFrom>;
  transactionTypes: TransactionTypeSelect[] = [];

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public categoryForUpdate: ICategory,
    private bottomSheetRef: MatBottomSheetRef<CategoriesComponent>,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      type: ['', Validators.required],
      color: [new Color(63, 81, 181), Validators.required],
      name: ['', Validators.required],
    });

    if (this.categoryForUpdate) {
      const [, red, green, blue] = this.categoryForUpdate.color
        .match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/)
        ?.map((match) => parseInt(match))!;

      this.categoryForm.setValue({
        type: this.categoryForUpdate.type as string,
        color: new Color(red, green, blue),
        name: this.categoryForUpdate.name,
      });
    }

    this.transactionTypes = Object.values(TransactionType).map((type) => ({
      value: type,
      label: type,
      fontIcon:
        type === TransactionType.Expense ? 'arrow_upward' : 'arrow_downward',
    }));
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const { type, color, name } = this.categoryForm.value;

      this.categoriesService.processFormRequest({
        id: this.categoryForUpdate?.id,
        type: type as TransactionType,
        color: `${color?.toRgbString()} `,
        name: name as string,
      });
      this.bottomSheetRef.dismiss();
    }
  }

  onCancel(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
