import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { createMask } from '@ngneat/input-mask';

import {
  ICategory,
  ITransaction,
  ITransactionForm,
  TransactionTypeIcon,
} from '../../models';
import { TransactionsService } from '../../services/transactions.service';
import { budgetMaskConfig } from 'src/shared/constants';
import { transformDateToDataBaseDateFormat } from 'src/shared/utils';
import { DataService } from 'src/shared/services/data.service';
import { TransactionsComponent } from '../transactions/transactions.component';

@Component({
  selector: 'budget-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  transactionTypeIcon = TransactionTypeIcon;
  transactionForm!: FormGroup<ITransactionForm>;
  categories: ICategory[] = [];
  budgetInputMask = createMask(budgetMaskConfig);

  constructor(
    private formBuilder: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<TransactionsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public transactionForUpdate: ITransaction,
    private transactionsService: TransactionsService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      categoryId: [null as number | null, [Validators.required]],
      date: [new Date(), [Validators.required]],
      amount: [null as number | null, [Validators.required]],
      note: [''],
    });

    if (this.transactionForUpdate) {
      const { categoryId, date, amount, note } = this.transactionForUpdate;

      this.transactionForm.setValue({
        categoryId,
        date: new Date(date),
        amount,
        note,
      });
    }

    this.categories = this.dataService.categories;
  }

  onCancel(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const { categoryId, date, amount, note } = this.transactionForm.value;

      this.transactionsService.processFormRequest({
        id: this.transactionForUpdate?.id,
        categoryId: categoryId as number,
        date: transformDateToDataBaseDateFormat(date as Date),
        amount: amount as number,
        note: note as string,
      });
      this.bottomSheetRef.dismiss();
    }
  }
}
