import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from '../core/core.module';
import { MainRoutingModule } from './main-routing.module';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { MainComponent } from './main.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CredentialsFormComponent } from './components/credentials-form/credentials-form.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    MainComponent,
    RegisterComponent,
    LoginComponent,
    CredentialsFormComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    MainRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  bootstrap: [MainComponent],
})
export class MainModule {}
