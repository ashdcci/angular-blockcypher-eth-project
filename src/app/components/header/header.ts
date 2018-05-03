import { Component, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { contentHeaders } from '../../common/headers';
declare var require:any;
const after_auth = require('./after_auth.html');
const before_auth = require('./before_auth.html');
import { socket } from '../../services/socket'



@Component({
  selector: 'admin-header',
  // template: (tokenNotExpired(null ,localStorage.getItem('id_token') )) ? after_auth : before_auth,
  template: (localStorage.getItem('id_token')!==null) ? after_auth : before_auth,
})
export class AdminHeader {
  type_str: any
  jwt : string
  user_address : string
  first_name: string
  last_name: string
  email: string
  userdata: any
  private socket = socket;
  faucet_token : any = 0
  constructor(public router: Router, public http: Http, public toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.jwt = localStorage.getItem('id_token');
    this.toastr.setRootViewContainerRef(vcr);
    this.userdata = JSON.parse(localStorage.getItem('userdata'))
    this.userdata.first_name = localStorage.getItem('first_name')
    this.userdata.last_name = localStorage.getItem('last_name')
    this.faucet_token = (localStorage.getItem('faucet_token')) ? localStorage.getItem('faucet_token') : 0
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

  ngOnInit(): void{
    
    if(localStorage.getItem('flash-success')){
      this.toastr.success(localStorage.getItem('flash-success'));
      this.removeFlashStorage(1)
    }else if(localStorage.getItem('flash-error')){
      this.toastr.error(localStorage.getItem('flash-error'));
      this.removeFlashStorage(2)
    }
    console.log('faucet token ', this.faucet_token)
    if(parseInt(this.faucet_token) == 0){
      this.socket.emit('faucet_token',this.jwt)
    }

    
    this.socket.on('complete_faucet_'+this.jwt, (data) => {
      console.log('return argument : ', data);

      if(data.status == 1){
        localStorage.setItem('faucet_token', '1');
        this.toastr.success('AT$ token Faucet Successfully!!!');
        this.removeFlashStorage(1)
      }else{

        this.toastr.error('Problam in faucet token');
        this.removeFlashStorage(2)
      }


    });
    
  }

  removeFlashStorage(type: any){
    this.type_str = (type==1) ? 'flash-success' : 'flash-error'  
    localStorage.removeItem(this.type_str)
  }


}
