import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { createMask } from '@ngneat/input-mask';

import { ISettingsFrom } from 'src/main/models';
import { budgetMaskConfig } from 'src/shared/constants';
import { DataService } from 'src/shared/services/data.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'budget-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settingsForm!: FormGroup<ISettingsFrom>;
  budgetInputMask = createMask(budgetMaskConfig);
  dayInputMask = createMask({
    alias: 'numeric',
    allowMinus: false,
    rightAlign: false,
    min: 1,
    max: 28,
    unmaskAsNumber: true,
    autoUnmask: true,
    clearMaskOnLostFocus: true,
  });

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private dialogRef: MatDialogRef<HomeComponent> // private settingsService: SettingsService, // private transactionService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group({
      budgetAmount: [
        this.dataService.settings.budgetAmount || null,
        [Validators.required],
      ],
      day: [this.dataService.settings.day, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      // this.settingsService
      //   .update(this.settingsForm.value as ISettings)
      //   .subscribe({
      //     next: (res) => {
      //       this.dataService.settings = res;
      //       this.transactionService.getAll(res.day);
      //     },
      //   });
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
