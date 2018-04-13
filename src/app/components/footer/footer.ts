import { Component,ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
declare var require:any;
const after_auth = require('./after_auth.html');
const before_auth = require('./before_auth.html');


@Component({
  selector: 'admin-footer',
  template: (tokenNotExpired()) ? after_auth : before_auth,
  encapsulation: ViewEncapsulation.None,
})
export class AdminFooter {

  constructor(public router: Router, public http: Http) {

  }

}
