import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRoute,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";
import {Observable} from 'rxjs/Rx';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { contentHeaders } from './headers';
import {GlobalVariable} from './global';

@Injectable()
export class AuthResetPassword implements CanActivate {
  token: string;
  error: string;
  public authenticated_reset: boolean
  constructor(private router: Router,private activatedRoute:ActivatedRoute,private http:HttpClient) {
    // this.authenticated_reset = true;
    // this.activatedRoute.params.subscribe((params: Params) => {
    //     this.token = params['token']
    //   });
    //   console.log(this.token)
    //
    //     if(this.token!="" || this.token!==undefined){
    //       console.log(545848)
    //       this.http.get('http://localhost:3001/api/users/check-reset-token/'+this.token, { headers: contentHeaders })
    //         .subscribe(
    //           response => {
    //             // localStorage.setItem('id_token', response.json().id_token);
    //             this.authenticated_reset = false;
    //           },
    //           error => {
    //             this.error = `${error.json().msg}`;
    //             this.authenticated_reset = true;
    //           }
    //         );
    //     }else{
    //       this.authenticated_reset = true;
    //     }


  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {

    var authenticated_reset : any;

    if(route.params.token!="" || route.params.token!==undefined){

      this.http.get<any>('http://localhost:3001/api/users/check-reset-token/'+route.params.token, { headers: contentHeaders })
        .subscribe(
          response => {
            // localStorage.setItem('id_token', response.json().id_token);
            authenticated_reset = true;
            // this.router.navigate(['/reset-password/'+route.params.token]);
          },
          error => {
            this.error = `${error.json().msg}`;
            authenticated_reset = true;
          }
        );
    }else{
      this.authenticated_reset = true;
    }

    return

  }
}
