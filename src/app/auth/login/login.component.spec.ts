import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule } from '@angular/material';
import { AuthService } from '../auth.service'

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, MatCardModule, MatInputModule,
      RouterTestingModule, BrowserAnimationsModule],
      declarations: [ LoginComponent ],
      providers : [AuthService]
    })
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);

  });


  it('Login shoud return True for correct credentials', () => {
    expect(authService.login("test@nv.com", "tested")).toBeTruthy();
  });

  it('Login shoud return False for wrong credentials', () => {
    expect(authService.login("test@nv.com", "123456")).toBeFalsy();
  });
});
