import { Component, OnInit } from '@angular/core';

import { SettingsService } from 'src/main/services/settings.service';

@Component({
  selector: 'budget-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {}
}
