import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const materialComponents = [
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  imports: materialComponents,
  exports: materialComponents,
})
export class AngularMaterialModule {}
