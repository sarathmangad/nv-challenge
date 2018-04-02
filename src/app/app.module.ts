import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatCheckboxModule, MatSidenavModule, MatListModule,  MatPaginatorModule,
  MatSortModule, MatGridListModule, MatTabsModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { UserListComponent } from './users/user-list/user-list.component';

import { AuthService } from './auth/auth.service'
import { UserService } from './users/user.service';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { CountryFilterComponent } from './users/country-filter/country-filter.component'



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    UserUpdateComponent,
    CountryFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatTabsModule
  ],
  entryComponents: [UserListComponent, UserUpdateComponent],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
