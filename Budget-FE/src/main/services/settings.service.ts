import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { ISettings } from '../models';
import { TransactionsService } from 'src/features/transactions/services/transactions.service';
import { BalanceService } from 'src/features/transactions/services/balance.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  endpoint: string = 'api/Settings';
  settings!: ISettings;

  constructor(
    private http: HttpClient,
    private transactionsService: TransactionsService,
    private balanceService: BalanceService
  ) {}

  get() {
    this.http
      .get<ISettings>(`${environment.serverUrl}/${this.endpoint}/Get`)
      .subscribe({
        next: (res) => {
          this.settings = res;
        },
      });
  }

  update(settings: ISettings) {
    this.http
      .put(`${environment.serverUrl}/${this.endpoint}/Update`, settings)
      .subscribe({
        next: (res) => {
          this.settings = settings;
          this.balanceService.calculateBalance(
            this.transactionsService.transactionsGroups,
            this.settings
          );
        },
      });
  }
}
