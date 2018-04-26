import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
declare var require:any;
const aside = require('./aside.html');


@Component({
  selector: 'sidebar',
  template: aside,
})
export class AsideComponent {

  constructor(public router: Router, public http: Http) {

  }

  /**
   * routes method at view level
   */

  viewProfile(){
    this.router.navigate(['profile']);
  }

  viewTransactions(){
    this.router.navigate(['transactions']);
  }

  sendBitcoin(){
    this.router.navigate(['send-bitcoin'])
  }

  sendEth(){
    this.router.navigate(['send-eth'])
  }

  sendToken(){
    this.router.navigate(['send-token'])
  }

  home(){
    this.router.navigate(['home'])
  }
}
