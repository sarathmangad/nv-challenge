import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatListModule, MatSidenavModule,
        MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTabsModule,
        MatDialogModule } from '@angular/material';
import { UserListComponent } from '../user-list/user-list.component'

import { CountryFilterComponent } from './country-filter.component';

describe('CountryFilterComponent', () => {
  let component: CountryFilterComponent;
  let fixture: ComponentFixture<CountryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryFilterComponent, UserListComponent],
      imports: [MatToolbarModule, MatListModule, MatSidenavModule,
        MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTabsModule,
        MatDialogModule, BrowserAnimationsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
