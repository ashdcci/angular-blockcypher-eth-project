import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class NonAuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {

    if (!tokenNotExpired(null ,localStorage.getItem('id_token') )) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
