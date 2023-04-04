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

export interface ITransactionForm {
  categoryId: FormControl<string | null>;
  date: FormControl<Date | null>;
  amount: FormControl<string | null>;
  note: FormControl<string | null>;
}

export interface ITransaction {
  id?: number;
  type?: TransactionType;
  category?: Partial<ICategory>;
  categoryId: number;
  date: string;
  amount: number;
  note: string;
}

export interface ITransactionsGroup {
  date: string;
  income: number;
  expense: number;
  transactions: ITransaction[];
}
