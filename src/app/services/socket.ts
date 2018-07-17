import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {environment} from '../../environments/environment'

@Injectable()
export class SocketService {
  private url = environment.apiUrl
  private socket;
  
    constructor(){
        this.socket = io(this.url);
    }

  sendMessage(message){
    this.socket.emit('add-message', message);    
  }
  
  receiverEth(ethAddress) {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('receive_eth_'+ethAddress, (data) => {
        observer.next(data);   
        this.socket.disconnect(); 
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  

  faucetToken(token){
    this.socket.emit('faucet_token',token)
  }

  senderEth(ethAddress) {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('sender_eth_'+ethAddress, (data) => {
        observer.next(data);
        this.socket.disconnect();    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  } 
  
  

  receiverToken(ethAddress) {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('receive_token_'+ethAddress, (data) => {
        observer.next(data);  
        this.socket.disconnect();  
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  


  senderToken(ethAddress) {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('sender_token_'+ethAddress, (data) => {
        observer.next(data);
        this.socket.disconnect();    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }

  completeFaucet(token){
    let observable = new Observable(observer => {
        this.socket = io(this.url);
        this.socket.on('complete_faucet_'+token, (data) => {
          observer.next(data);
          this.socket.disconnect();    
        });
        return () => {
          this.socket.disconnect();
        };  
      })     
      return observable;
  }

}


// import io from "socket.io-client";
// let url = 'http://localhost:3003';
// export let socket = io.connect(url);
