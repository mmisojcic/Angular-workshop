import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import { ICategory } from '../models';
import { DataService } from 'src/shared/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  endpoint: string = 'api/Category';

  constructor(private http: HttpClient, private dataService: DataService) {}

  add(category: ICategory) {
    this.http
      .post<ICategory>(
        `${environment.serverUrl}/${this.endpoint}/Add`,
        category
      )
      .subscribe({
        next: (res) => {
          this.getAll().subscribe({
            next: (res) => {
              this.dataService.categoriesSubject.next(res);
              this.dataService.categories = res;
            },
          });
        },
      });
  }

  getAll() {
    return this.http.get<ICategory[]>(
      `${environment.serverUrl}/${this.endpoint}/GetAll`
    );
  }

  update(category: ICategory) {
    this.http
      .put<ICategory>(
        `${environment.serverUrl}/${this.endpoint}/Update`,
        category
      )
      .subscribe({
        next: (res) => {
          this.getAll().subscribe({
            next: (res) => {
              this.dataService.categoriesSubject.next(res);
              this.dataService.categories = res;
            },
          });
        },
      });
  }

  processFormRequest(category: ICategory) {
    if (category.id) {
      this.update(category);
    } else {
      this.add(category);
    }
  }
}
