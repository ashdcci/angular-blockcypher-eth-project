// import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
 
// @Injectable()
// export class SocketService {
//     token : any 
//     constructor(private socket: Socket) { 
//         console.log(51454)
//         this.token = localStorage.getItem('id_token')
//     }
 
//     sendMessage(msg: string){
//         console.log(msg)
//         this.socket.emit("addTodo", msg);
//     }
    
//     addTodo() {
//         return this.socket
//             .fromEvent("addTodo")
//             .map( data => data);
//     }

//     faucet_token(token : string){
//         console.log(token)
//         this.socket.emit("faucet_token", token);
//     }

//     complete_faucet(){
//         return this.socket.fromEvent('complete_faucet_').map( data => data).subscribe(response =>{
//             console.log(response)
//         })
//     }


// }


import io from "socket.io-client";
let url = 'http://localhost:3003';
export let socket = io.connect(url);
