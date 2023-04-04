import { Component, Input } from '@angular/core';

import { ITransactionsGroup } from '../../models';

@Component({
  selector: 'budget-transactions-date-group',
  templateUrl: './transactions-date-group.component.html',
  styleUrls: ['./transactions-date-group.component.scss'],
})
export class TransactionsDateGroupComponent {
  @Input() transactionsGroup!: ITransactionsGroup;
}
