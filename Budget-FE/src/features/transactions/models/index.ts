import { Color } from '@angular-material-components/color-picker';
import { FormControl } from '@angular/forms';

export enum TransactionType {
  Income = 'Income',
  Expense = 'Expense',
}

export interface TransactionTypeSelect {
  value: string;
  label: string;
  fontIcon: string;
}

export interface ICategoryFrom {
  type: FormControl<string | null>;
  color: FormControl<Color | null>;
  name: FormControl<string | null>;
}

export interface ICategory {
  id?: number;
  type: TransactionType;
  color: string;
  name: string;
}
