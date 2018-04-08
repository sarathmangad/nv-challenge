import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { AuthService } from '../auth.service'
import {Router} from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginStatus = false;
  showLoginError = false;
  email = "";
  password = "";
  constructor(private authService: AuthService, private router: Router) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  ngOnInit() {
  }

  login() {
        this.loginStatus = this.authService.login(this.email, this.password)
        if(this.loginStatus){
          this.router.navigate(['users']);
        }
        else{
            this.showLoginError = true;
        }
  }

  logout() {
    this.authService.logout()
  }
}
