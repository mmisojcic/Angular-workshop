import { AbstractControl, FormControl } from '@angular/forms';

export interface ICredentialsFrom {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}
