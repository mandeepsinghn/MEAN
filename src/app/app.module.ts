import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ApplicationRoutingModule, routingComponents } from './common/routings/application-routing/application-routing.module';
import { CookieService } from 'angular2-cookie/core';
import { AddCategoryComponent } from './categories/create/add-category/add-category.component';
import { ViewAllCategoriesComponent } from './categories/read/view-all-categories/view-all-categories.component';

import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatCheckboxModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AddCategoryComponent,
    ViewAllCategoriesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
    ApplicationRoutingModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      BrowserAnimationsModule,
      MatCheckboxModule
  ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        MatCheckboxModule
    ],
  providers: [
    AuthService,
    AuthGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
