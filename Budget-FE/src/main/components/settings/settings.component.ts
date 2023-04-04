import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { createMask } from '@ngneat/input-mask';

import { ISettings, ISettingsFrom } from 'src/main/models';
import { HomeComponent } from '../home/home.component';
import { SettingsService } from 'src/main/services/settings.service';
import { budgetMaskConfig } from 'src/shared/constants';

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
    private dialogRef: MatDialogRef<HomeComponent>,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group({
      budgetAmount: [
        this.settingsService.settings.budgetAmount,
        [Validators.required],
      ],
      day: [this.settingsService.settings.day, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      this.settingsService.update(this.settingsForm.value as ISettings);
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
