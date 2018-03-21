import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ApplicationRoutingModule, routingComponents } from './common/routings/application-routing/application-routing.module';
import { CookieService } from 'angular2-cookie/core';
import { AddCategoryComponent } from './categories/create/add-category/add-category.component';
import { ViewAllCategoriesComponent } from './categories/read/view-all-categories/view-all-categories.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AddCategoryComponent,
    ViewAllCategoriesComponent
  ],
  imports: [
    BrowserModule,
    ApplicationRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
