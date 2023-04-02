import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthenticationService } from 'src/core/services/authentication.service';
import { TransactionsRoute } from 'src/shared/models';
import { SettingsComponent } from '../settings/settings.component';
import { JwtTokenService } from 'src/core/services/jwt-token.service';
import { SettingsService } from 'src/main/services/settings.service';
import { CategoriesService } from 'src/features/transactions/services/categories.service';

@Component({
  selector: 'budget-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username: string | undefined = '';
  links = TransactionsRoute;
  activeLink: string | undefined = '';

  constructor(
    private authenticationService: AuthenticationService,
    private settingsService: SettingsService,
    private jwtTokenService: JwtTokenService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.username = this.jwtTokenService.getUsername();
    this.settingsService.get();
    this.activeLink = this.activatedRoute.firstChild?.routeConfig?.path;
    this.categoriesService.getAll();
  }

  onLogout() {
    this.authenticationService.logout();
  }

  onTabChange(link: TransactionsRoute) {
    this.activeLink = link;
    this.router.navigate([link], { relativeTo: this.activatedRoute });
  }

  onOpenDialog() {
    this.dialog.open(SettingsComponent);
  }
}
