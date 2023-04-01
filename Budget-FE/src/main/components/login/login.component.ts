import { Component } from '@angular/core';
import { ICredentials } from 'src/core/models';

@Component({
  selector: 'budget-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitLabel: string = 'Login';

  onEmitCredentials(credentials: ICredentials) {
    console.log(credentials);
  }
}
