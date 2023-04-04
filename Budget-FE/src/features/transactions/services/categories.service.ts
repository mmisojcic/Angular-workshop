import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { environment } from 'environments/environment';
import { ICategory } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  endpoint: string = 'api/Category';
  categories: ICategory[] = [];
  categoriesSubject: ReplaySubject<ICategory[]> = new ReplaySubject();

  constructor(private http: HttpClient) {}

  add(category: ICategory) {
    this.http
      .post<ICategory>(
        `${environment.serverUrl}/${this.endpoint}/Add`,
        category
      )
      .subscribe({
        next: (res) => {
          this.getAll();
        },
      });
  }

  getAll() {
    this.http
      .get<ICategory[]>(`${environment.serverUrl}/${this.endpoint}/GetAll`)
      .subscribe({
        next: (res) => {
          this.categoriesSubject.next(res);
          this.categories = res;
        },
      });
  }
}
