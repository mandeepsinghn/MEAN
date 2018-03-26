import {DashboardComponent} from '../../../application/dashboard/dashboard.component';
import {AuthGuard} from '../../../auth/auth.guard';
import {LoginComponent} from '../../../auth/login/login.component';
import {RegisterComponent} from '../../../auth/register/register.component';
import {AddCategoryComponent} from '../../../categories/create/add-category/add-category.component';
import { ViewAllCategoriesComponent } from '../../../categories/read/view-all-categories/view-all-categories.component';
import {HeaderComponent} from '../../header/header.component';
import {LeftSidebarComponent} from '../../sidebars/left-sidebar/left-sidebar.component';
import {RightSidebarComponent} from '../../sidebars/right-sidebar/right-sidebar.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ProfileComponent } from '../../../user/profile/profile.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'cpanel'},
  {
    path: 'cpanel', component: DashboardComponent,
    children: [
      {
          path: 'user/profile',
          component: ProfileComponent
      },
      {
        path: 'category/add-new',
        component: AddCategoryComponent
      },
      {
        path: 'category/view-all-categories',
        component: ViewAllCategoriesComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ApplicationRoutingModule {}

export const routingComponents = [
  HeaderComponent,
  LeftSidebarComponent,
  RightSidebarComponent,
  DashboardComponent,
  LoginComponent,
  RegisterComponent
];
