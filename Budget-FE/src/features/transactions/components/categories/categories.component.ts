import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';

import { CategoryFormComponent } from '../category-form/category-form.component';
import { CategoriesService } from '../../services/categories.service';
import { ICategory } from '../../models';

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
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesSubscription =
      this.categoriesService.categoriesSubject.subscribe({
        next: (res) => {
          this.categories = res;
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
