import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loginStatus = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
        this.loginStatus = this.authService.login(this.model.username, this.model.password)
        if(this.loginStatus){
          this.router.navigate(['users']);
        }
        else{

        }
  }

  logout() {
    this.authService.logout()
  }
}
