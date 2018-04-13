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
}
