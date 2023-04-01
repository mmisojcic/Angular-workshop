import { Component } from '@angular/core';

import { ICredentials } from 'src/core/models';
import { AuthenticationService } from 'src/core/services/authentication.service';

@Component({
  selector: 'budget-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  submitLabel: string = 'Register';

  constructor(private authenticationService: AuthenticationService) {}

  onEmitCredentials(credentials: ICredentials) {
    this.authenticationService.register(credentials);
  }
}
