import { Component, ViewContainerRef, OnInit, OnDestroy, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { contentHeaders } from '../../common/headers';
declare var require:any;
const after_auth = require('./after_auth.html');
const before_auth = require('./before_auth.html');
import { SocketService } from '../../services/socket'



@Component({
  selector: 'admin-header',
  // template: (tokenNotExpired(null ,localStorage.getItem('id_token') )) ? after_auth : before_auth,
  templateUrl: (localStorage.getItem('id_token')) ? './after_auth.html' : './before_auth.html',

  providers:[SocketService]
})
export class AdminHeader implements OnInit, OnDestroy {
  // @Input() childData: {prop1: string, prop2: string};
  question : any;
  type_str: any
  jwt : string
  user_address : string
  first_name: string
  last_name: string
  email: string
  email_token : string
  userdata: any
  connection;
  socket_data :any  = {}
  faucet_token : any = 0


  // get prop2(){
  //   console.log(5521,this.childData)
  //   return this.childData.prop2;
  // }
  // get prop1(){
  //   return this.childData.prop1;
  // }

  // get childData(){
  //   console.log(8484884,this.childData)
  //   return this.childData;
  // }


  private _childData: any;
    @Input()
    set childData(parentData02: any) {
        // every time the data from the parent changes this will run
        console.log('after get api: ',parentData02);
        this._childData = parentData02; // ...or do some other crazy stuff
    }
    get childData(): any { return this._childData; }

  constructor(public router: Router, public http: Http, public toastr: ToastsManager, private vcr: ViewContainerRef, private SocketService: SocketService) {
    this.jwt = localStorage.getItem('id_token');
    this.email_token = localStorage.getItem('email');
    this.toastr.setRootViewContainerRef(vcr);
    this.userdata = JSON.parse(localStorage.getItem('userdata'))
    this.userdata.first_name = localStorage.getItem('first_name')
    this.userdata.last_name = localStorage.getItem('last_name')
    this.faucet_token = (localStorage.getItem('faucet_token')) ? localStorage.getItem('faucet_token') : 0
    this.user_address = this.userdata.user_address
    this.first_name = (localStorage.getItem('first_name')) ? localStorage.getItem('first_name')  : this.email_token
    this.last_name = (localStorage.getItem('last_name')) ? localStorage.getItem('last_name') : this.userdata.last_name
    this.email = this.userdata.email
    
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    } 

    // console.log(this.question, this.childData)

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
    
    this.question = this.childData;
    console.log('from home component: ',this.question);


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
    
    if(parseInt(this.faucet_token) == 0){
      this.SocketService.faucetToken(this.jwt)
    }

    /**
     * Complete Faucet Socket
     */
    this.connection = this.SocketService.completeFaucet(this.jwt).subscribe(socketData => {
      this.socket_data = socketData
      console.log(this.jwt,this.socket_data)
      if(this.socket_data.status == 1){
        localStorage.setItem('faucet_token', '1');
        this.toastr.success('AT$ token Faucet Successfully!!!');
        this.removeFlashStorage(1)
      }else{

        this.toastr.error('Problam in faucet token');
        this.removeFlashStorage(2)
      }
      this.socket_data = {}

    });


    this.connection = this.SocketService.receiverEth(this.userdata.eth_address).subscribe(socketData => {
      
      this.socket_data = socketData
      // console.log('sender socket data:',this.socket_data,this.socket_data.status)
      if(this.socket_data.status == 1){
        this.toastr.success('you have received '+this.socket_data.eth_balance+' ETH');
        this.removeFlashStorage(1)
      }
      this.socket_data = {}
    })


    this.connection = this.SocketService.senderEth(this.userdata.eth_address).subscribe(socketData =>{
      
      this.socket_data = socketData
      // console.log('sender socket data:',this.socket_data,this.socket_data.status)
      if(this.socket_data.status == 2){
        this.toastr.info('you give get notification when transaction is complete.');
        this.removeFlashStorage(3)
      }else if(this.socket_data.status==1){
        this.toastr.success(this.socket_data.status+' ETH is debited to your account');
        this.removeFlashStorage(1)
      }else if(this.socket_data.status==0){
        this.toastr.error('Problam in sending ETH balance');
        this.removeFlashStorage(1)
      }

      this.socket_data = {}
    })



    this.connection = this.SocketService.receiverToken(this.userdata.eth_address).subscribe(socketData => {
      
      this.socket_data = socketData
      // console.log('sender socket data:',this.socket_data,this.socket_data.status)
      if(this.socket_data.status == 1){
        this.toastr.success('you have received '+this.socket_data.eth_balance+' AT$');
        this.removeFlashStorage(1)
      }
      this.socket_data = {}
    })


    this.connection = this.SocketService.senderToken(this.userdata.eth_address).subscribe(socketData =>{
      
      this.socket_data = socketData
      // console.log('sender socket data:',this.socket_data,this.socket_data.status)
      if(this.socket_data.status == 2){
        this.toastr.info('you give get notification when transaction is complete.');
        this.removeFlashStorage(3)
      }else if(this.socket_data.status==1){
        this.toastr.success(this.socket_data.status+' AT$ token is debited to your account');
        this.removeFlashStorage(1)
      }else if(this.socket_data.status==0){
        this.toastr.error('Problam in sending AT$ Tokens');
        this.removeFlashStorage(1)
      }

      this.socket_data = {}
    })


    
  }


  ngOnDestroy() : void {
    this.connection.unsubscribe();
  }

  removeFlashStorage(type: any){
    this.type_str = (type==1) ? 'flash-success' : ((type==3) ? 'flash-info' : 'flash-error')
    localStorage.removeItem(this.type_str)
  }


}
