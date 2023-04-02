import { FormControl } from '@angular/forms';

export interface ICredentialsFrom {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface ISettingsFrom {
  budgetAmount: FormControl<number | null>;
  day: FormControl<number | null>;
}

export interface ISettings {
  budgetAmount: number;
  day: number;
}
