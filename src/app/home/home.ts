import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import {PlatformService} from '../services/platform'
declare var require: any;

const styles = require('./home.css');
const template = require('./home.html');


@Component({
  selector: 'home',
  template: template,
  styles: [ styles ]
})
export class Home {

  jwt: string;
  balance: any = 0
  loading: boolean = true
  loading_send : boolean = true
  loading_recd : boolean = true
  loading_token : boolean = true
  loading_eth : boolean = true
  total_send: any = 0
  total_recd: any = 0
  recd_amount: any = 0
  total_token : any = 0
  total_eth : any  = 0
  as1: any
  as2: any
  as3: any
  timer1:any
  timer2:any
  timer3:any
  constructor(public router: Router, public http: Http, public authHttp: AuthHttp, private PlatformService:PlatformService) {
    this.jwt = localStorage.getItem('id_token');
    
    // this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
  }

  onLoad() {
      this.loading = false;
  }

  ngOnInit(): void {
    this.getBalance()
    this.getTotalSend()
    this.getTotalReceived()
    this.getTotalToken()
    this.getTotalEth()
    
  }


  clear1(){
    console.log('clear1')
    clearInterval(this.as1)
  }

  clear2(){
    console.log('clear2')
    clearInterval(this.as2)
  }

  clear3(){
    console.log('clear3')
    clearInterval(this.as3)
  }

  start1(){
    console.log('start1')
    this.as1 = setInterval(() => {
      var d = new Date();
      var s = d.getUTCSeconds();
      var h = d.getHours()
      var m = d.getMinutes()

      var g = s + 1
      this.timer1 = h+':'+m+':'+s
      }, 1000);
  }

  start2(){
    console.log('start2')
    this.as2 = setInterval(() => {
      var d = new Date();
      var s = d.getUTCSeconds();
      var h = d.getHours()
      var m = d.getMinutes()

      var g = s + 1
      this.timer2 = h+':'+m+':'+s
      }, 1000);
  }

  start3(){
    console.log('start3')
    this.as3 = setInterval(() => {
      var d = new Date();
      var s = d.getUTCSeconds();
      var h = d.getHours()
      var m = d.getMinutes()

      var g = s + 1
      this.timer3 = h+':'+m+':'+s
      }, 1000);
  }

  getBalance(){
    this.PlatformService.getUserBalance().subscribe(response=>{
        this.loading = false;
        this.balance = response.body.final_balance * 0.00000001 +' ฿'
    },
    error=>{
      console.log(error)
    })
  }

  getTotalSend(){
    this.PlatformService.getSendMoney().subscribe(response=>{
        this.loading_send = false;
        this.total_send = (response.total_send > 0) ?  (response.total_send * 0.00000001) : 0
        this.total_send = this.total_send +' ฿'
    },
    error=>{
      console.log(error)
    })
  }

  getTotalReceived(){
    this.PlatformService.getRecdMoney().subscribe(response=>{
        this.loading_recd = false;
        this.total_recd = (response.total_send > 0) ?  (response.total_send * 0.00000001) : 0
        this.total_recd = this.total_recd +' ฿'
    },
    error=>{
      console.log(error)
    })
  }

  getTotalToken(){
    this.PlatformService.getTokenBalance().subscribe(response => {
        this.loading_token = false
        this.total_token = response.token +' AT$'
    },
    error => {
      console.log(error)
    })
  }


  getTotalEth(){
    this.PlatformService.getEthBalance().subscribe(response => {
      this.loading_eth = false
      this.total_eth = response.balance +' ETH'
  },
  error => {
    console.log(error)
  })
  }



}
