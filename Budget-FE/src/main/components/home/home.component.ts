import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthenticationService } from 'src/core/services/authentication.service';
import { SettingsComponent } from '../settings/settings.component';
import { JwtTokenService } from 'src/core/services/jwt-token.service';
import { SettingsService } from 'src/main/services/settings.service';
import { CategoriesService } from 'src/features/transactions/services/categories.service';
import { TransactionsService } from 'src/features/transactions/services/transactions.service';

@Component({
  selector: 'budget-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username: string | undefined = '';

  constructor(
    private authenticationService: AuthenticationService,
    private settingsService: SettingsService,
    private jwtTokenService: JwtTokenService,
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.username = this.jwtTokenService.getUsername();
    this.settingsService.get();
    this.categoriesService.getAll();
    this.transactionsService.getAll();
  }

  onLogout() {
    this.authenticationService.logout();
  }

  onOpenDialog() {
    this.dialog.open(SettingsComponent);
  }
}
