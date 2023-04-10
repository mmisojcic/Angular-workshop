import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthenticationService } from 'src/core/services/authentication.service';
import { JwtTokenService } from 'src/core/services/jwt-token.service';
import { SettingsService } from 'src/main/services/settings.service';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'budget-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  username: string | undefined = '';

  constructor(
    private authenticationService: AuthenticationService,
    private settingsService: SettingsService,
    private jwtTokenService: JwtTokenService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.username = this.jwtTokenService.getUsername();
    this.settingsService.get();
  }

  onLogout() {
    this.authenticationService.logout();
  }

  onOpenDialog() {
    this.dialog.open(SettingsComponent);
  }
}
