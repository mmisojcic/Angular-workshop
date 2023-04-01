import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from 'src/core/services/authentication.service';
import { TransactionsRoute } from 'src/shared/models';

@Component({
  selector: 'budget-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username: string | undefined = '';
  links = TransactionsRoute;
  activeLink: string = TransactionsRoute.Transactions;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.username = this.authenticationService.username;
  }

  onLogout() {
    this.authenticationService.logout();
  }

  onTabChange(link: TransactionsRoute) {
    this.activeLink = link;
    this.router.navigate([link], { relativeTo: this.activatedRoute });
  }
}
