import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputMaskModule } from '@ngneat/input-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CredentialsFormComponent } from './components/credentials-form/credentials-form.component';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthorizationInterceptor } from 'src/core/interceptors/authorization.interceptor';
import { SettingsComponent } from './components/settings/settings.component';
import { CoreModule } from 'src/core/core.module';

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegisterComponent,
    CredentialsFormComponent,
    HomeComponent,
    NotFoundComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputMaskModule,
    CoreModule,
  ],
  bootstrap: [MainComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
  ],
})
export class MainModule {}
