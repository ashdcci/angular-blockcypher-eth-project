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
  template: (localStorage.getItem('id_token')) ? after_auth : before_auth,
})
export class AdminHeader {
  type_str: any
  jwt : string
  user_address : string
  first_name: string
  last_name: string
  email: string
  email_token : string
  userdata: any
  private socket = socket;
  faucet_token : any = 0
  constructor(public router: Router, public http: Http, public toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.jwt = localStorage.getItem('id_token');
    this.email_token = localStorage.getItem('email');
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
    localStorage.removeItem('faucet_token')
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
    }else if(localStorage.getItem('flash-info')){
      this.toastr.info(localStorage.getItem('flash-info'));
      this.removeFlashStorage(3)
    }
    console.log('faucet token ', parseInt(this.faucet_token))
    if(parseInt(this.faucet_token) == 0){
      this.socket.emit('faucet_token',this.jwt)
    }

    /**
     * Complete Faucet Socket
     */
    this.socket.on('complete_faucet_'+this.jwt, (data) => {
    
      if(data.status == 1){
        localStorage.setItem('faucet_token', '1');
        this.toastr.success('AT$ token Faucet Successfully!!!');
        this.removeFlashStorage(1)
      }else{

        this.toastr.error('Problam in faucet token');
        this.removeFlashStorage(2)
      }


    });

    /** 
     * Receive Eth Token
     */
    this.socket.on('receive_eth_'+this.userdata.eth_address, (data) =>{
      if(data.status == 1){
        this.toastr.success('you have received '+data.eth_balance+' ETH');
        this.removeFlashStorage(1)
      }
    })


    
  }

  removeFlashStorage(type: any){
    this.type_str = (type==1) ? 'flash-success' : ((type==3) ? 'flash-info' : 'flash-error')
    localStorage.removeItem(this.type_str)
  }


}
