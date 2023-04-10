import { Color } from '@angular-material-components/color-picker';
import { FormControl } from '@angular/forms';

export enum TransactionType {
  Income = 'Income',
  Expense = 'Expense',
}

export interface ICategory {
  id?: number;
  type: TransactionType;
  color: string;
  name: string;
}

export interface ICategoryFrom {
  type: FormControl<string | null>;
  color: FormControl<Color | null>;
  name: FormControl<string | null>;
}

export interface TransactionTypeSelect {
  value: string;
  label: string;
  fontIcon: string;
}

export enum TransactionTypeIcon {
  Income = 'arrow_downward',
  Expense = 'arrow_upward',
}

export interface ITransactionForm {
  categoryId: FormControl<number | null>;
  date: FormControl<Date | null>;
  amount: FormControl<number | null>;
  note: FormControl<string | null>;
}

export interface ITransaction {
  id?: number;
  type?: TransactionType;
  category?: ICategory;
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

export interface IBalance {
  startDate: Date;
  endDate: Date;
  income: number;
  expense: number;
  amount: number;
  plannedBudget: number;
  remainingBudget: number;
  spentBudgetPercentage: number;
}
