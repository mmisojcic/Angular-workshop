import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreModule } from '../core/core.module';
import { MainRoutingModule } from './main-routing.module';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { MainComponent } from './main.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CredentialsFormComponent } from './components/credentials-form/credentials-form.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthorizationInterceptor } from 'src/core/interceptors/authorization.interceptor';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
  declarations: [
    MainComponent,
    RegisterComponent,
    LoginComponent,
    CredentialsFormComponent,
    HomeComponent,
    NotFoundComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    MainRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    InputMaskModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [MainComponent],
})
export class MainModule {}
