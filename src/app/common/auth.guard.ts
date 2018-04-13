import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    // console.log(889320,tokenNotExpired(null ,localStorage.getItem('id_token') ), localStorage.getItem('id_token'))
    if (tokenNotExpired(null ,localStorage.getItem('id_token') )) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
