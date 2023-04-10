import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ICategory } from '../../models';
import { DataService } from 'src/shared/services/data.service';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'budget-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: ICategory[] = [];
  categoriesSubscription: Subscription = new Subscription();

  constructor(
    private bottomSheet: MatBottomSheet,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.dataService.categoriesSubject.subscribe({
      next: (data) => {
        this.categories = data;
      },
    });
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }

  onNewCategory() {
    this.bottomSheet.open(CategoryFormComponent, {
      panelClass: 'bottom-sheet',
    });
  }
}
