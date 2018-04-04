import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class NvErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

  matcher = new NvErrorStateMatcher();
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
