import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import {PlatformService} from '../../../services/platform'
import { contentHeaders } from '../../../common/headers';

declare var require: any;

// const template = require('./transactions.html');

@Component({
  selector: 'eth-transactions',
  templateUrl: './eth_transactions.html',
  providers:[PlatformService]
})
export class EthTransactions {
  
  jwt: string;
  balance: any = 0
  loading: boolean = true
  user_address : string
  first_name: string
  last_name: string
  email: string
  userdata: any
  error: string;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'first_name';
  public sortOrder = 'asc';
  public activePage = 1
  public amountOfRows = 0;
  public pseudoServer = [];
   // data supplied to the data table
   public data: any[];
   // array of currently selected entities in the data table
   selectedEntities: any[];
  constructor(public router: Router, public http: Http, public authHttp: AuthHttp, private PlatformService:PlatformService) {
    this.jwt = localStorage.getItem('id_token');
    this.userdata = JSON.parse(localStorage.getItem('userdata'))
    this.user_address = this.userdata.user_address
    this.first_name = this.userdata.first_name
    this.last_name = this.userdata.last_name
    this.email = this.userdata.email
  }


  onLoad() {
      this.loading = false;
  }

  // function to handle data/entities selected/deselected in the table 
  public setSelectedEntities($event: any) {
      this.selectedEntities = $event;
  }

  ngOnInit(): void {
    this.getTransactions()
  }

  getTransactions(){
    this.PlatformService.getEthTransactionsList({tx_type: 2})
      .subscribe(
        response => {
          this.data = response.tx_data;
          // this.pseudoServer = response.json().data;
          // this.load(1);
        },
        error => {
          this.data = []
        }
      );
  }


  public load(page: number) {
    this.data = [];
    this.amountOfRows = this.pseudoServer.length;
    let start = page * this.rowsOnPage;
    this.data = this.pseudoServer.slice(start, start + this.rowsOnPage);

  }

  public toInt(num: string) {
      return +num;
  }

  public sortByWordLength = (a: any) => {
      return a.city.length;
  };

  public remove(item) {
      let index = this.data.indexOf(item);
      if (index > -1) {
          this.data.splice(index, 1);
      }
  }

  public onPageChange(event) {

      this.rowsOnPage = event.rowsOnPage;
      this.load(event.activePage);
  }


  sortdata(sortBy,type):any {
    // console.log(sortBy,type)
  }

  onPageChange5(field): any{
    // console.log(552,field)
  }
  
  


}
