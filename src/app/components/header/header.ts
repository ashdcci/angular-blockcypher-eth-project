import { Component, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { contentHeaders } from '../../common/headers';
declare var require:any;
const after_auth = require('./after_auth.html');
const before_auth = require('./before_auth.html');


@Component({
  selector: 'admin-header',
  // template: (tokenNotExpired(null ,localStorage.getItem('id_token') )) ? after_auth : before_auth,
  template: (localStorage.getItem('id_token')!==null) ? after_auth : before_auth,
})
export class AdminHeader {
  type_str: any
  user_address : string
  first_name: string
  last_name: string
  email: string
  userdata: any
  constructor(public router: Router, public http: Http, public toastr: ToastsManager, private vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);
    this.userdata = JSON.parse(localStorage.getItem('userdata'))
    this.userdata.first_name = localStorage.getItem('first_name')
    this.userdata.last_name = localStorage.getItem('last_name')

    this.user_address = this.userdata.user_address
    this.first_name = (localStorage.getItem('first_name')) ? localStorage.getItem('first_name')  : this.userdata.first_name
    this.last_name = (localStorage.getItem('last_name')) ? localStorage.getItem('last_name') : this.userdata.last_name
    this.email = this.userdata.email

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    } 
  }

  logout(){
    event.preventDefault();
    localStorage.removeItem('id_token')
    localStorage.removeItem('userdata')
    localStorage.clear();

    console.log('token after logout === ',localStorage.getItem('id_token'))
    

    // window.location.href='/login'
    this.router.navigated = false;
    this.router.navigate(['login']);
  }

  ngOnInit(){
    
    if(localStorage.getItem('flash-success')){
      this.toastr.success(localStorage.getItem('flash-success'));
      this.removeFlashStorage(1)
    }else if(localStorage.getItem('flash-error')){
      this.toastr.error(localStorage.getItem('flash-error'));
      this.removeFlashStorage(2)
    }
    
  }

  removeFlashStorage(type: any){
    this.type_str = (type==1) ? 'flash-success' : 'flash-error'  
    localStorage.removeItem(this.type_str)
  }
}
