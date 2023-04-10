import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from 'src/shared/services/data.service';
import { ISettings } from '../models';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  endpoint: string = 'api/Settings';

  constructor(private http: HttpClient, private dataService: DataService) {}

  get() {
    this.http
      .get<ISettings>(`${environment.serverUrl}/${this.endpoint}/Get`)
      .subscribe({
        next: (res) => {
          this.dataService.settings = res;
        },
      });
  }
}
