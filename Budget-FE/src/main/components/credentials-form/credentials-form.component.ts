import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { ICredentials } from 'src/core/models';
import { ICredentialsFrom } from 'src/main/models';

@Component({
  selector: 'budget-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss'],
})
export class CredentialsFormComponent implements OnInit {
  @Input() submitLabel: string = '';
  @Output() emitCredentials: EventEmitter<ICredentials> = new EventEmitter();

  credentialsForm!: FormGroup<ICredentialsFrom>;
  passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.credentialsForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', this.setPasswordValidators()],
    });
  }

  setPasswordValidators(): ValidatorFn[] {
    return this.submitLabel === 'Register'
      ? [Validators.required, Validators.pattern(this.passwordPattern)]
      : [Validators.required];
  }

  onSubmit(): void {
    if (this.credentialsForm.valid) {
      this.emitCredentials.emit(this.credentialsForm.value as ICredentials);
    }
  }
}
