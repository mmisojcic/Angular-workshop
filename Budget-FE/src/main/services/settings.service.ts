import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { ISettings } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  endpoint: string = 'api/Settings';
  settings!: ISettings;

  constructor(private http: HttpClient) {}

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
        },
      });
  }
}
