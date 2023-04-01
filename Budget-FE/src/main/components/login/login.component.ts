import { Component } from '@angular/core';

import { ICredentials } from 'src/core/models';
import { AuthenticationService } from 'src/core/services/authentication.service';

@Component({
  selector: 'budget-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitLabel: string = 'Login';

  constructor(private authenticationService: AuthenticationService) {}

  onEmitCredentials(credentials: ICredentials) {
    this.authenticationService.login(credentials);
  }
}
