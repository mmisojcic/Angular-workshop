import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { ISettings } from '../models';
import { DataService } from 'src/shared/services/data.service';

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

  update(settings: ISettings): Observable<ISettings> {
    return this.http.put<ISettings>(
      `${environment.serverUrl}/${this.endpoint}/Update`,
      settings
    );
  }
}
