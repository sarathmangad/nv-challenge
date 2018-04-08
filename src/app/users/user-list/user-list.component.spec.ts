import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountryFilterComponent } from '../country-filter/country-filter.component'
import { AuthService } from 'app/auth/auth.service'
import { UserService } from '../user.service'

import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatCheckboxModule, MatSidenavModule, MatListModule,  MatPaginatorModule,
  MatSortModule, MatGridListModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatToolbarModule, MatListModule, MatSidenavModule, FormsModule,
        MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTabsModule,
        MatDialogModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [ UserListComponent, CountryFilterComponent],
      providers : [AuthService, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.dataSource.paginator = component.paginator;
  });


  it('should return all 11 users', () => {
    expect(component.getUsers().length).toBe(11);
  });

});
