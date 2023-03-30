import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ICredentials } from 'src/core/models';

import { ICredentialsFrom } from 'src/main/models/indexl';

@Component({
  selector: 'budget-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss'],
})
export class CredentialsFormComponent implements OnInit {
  @Input() submitLabel: string = '';
  credentialsForm!: FormGroup<ICredentialsFrom>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.credentialsForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
          ),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.credentialsForm.invalid) {
      return;
    }

    console.log(this.credentialsForm.controls);
  }
}
