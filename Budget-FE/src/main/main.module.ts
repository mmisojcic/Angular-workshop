import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { MainRoutingModule } from './main-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { MainComponent } from './main.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CredentialsFormComponent } from './components/credentials-form/credentials-form.component';

@NgModule({
  declarations: [
    MainComponent,
    RegisterComponent,
    LoginComponent,
    CredentialsFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MainRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  bootstrap: [MainComponent],
})
export class MainModule {}
