import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate{
  loginEmail = "test@nv.com";
  loginPassword = "tested"
  constructor(private router: Router) { }

  login(username: string, password: string) {

        if(username === this.loginEmail && password === this.loginPassword){
          localStorage.setItem("userId", username);
          return true;
        }
        else{
          return false;
        }
  }

  logout() {
      localStorage.removeItem('userId');
      this.router.navigate(['/login']);
  }

  canActivate(){
    if (localStorage.getItem('userId')) {
        return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
