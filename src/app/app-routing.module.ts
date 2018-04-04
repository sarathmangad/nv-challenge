import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component'
import { LoginComponent } from './auth/login/login.component'
import { AuthService } from './auth/auth.service'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthService]
  },
  {
    path: 'login',
    component: LoginComponent
  }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
