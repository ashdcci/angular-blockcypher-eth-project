import { Component } from '@angular/core'
import { Http } from '@angular/http'
import { Router } from '@angular/router'
import { AuthHttp } from 'angular2-jwt'
import {PlatformService} from '../services/platform'
import { contentHeaders } from '../common/headers'
import Web3 from 'web3';
import { FormErrorComponent } from '../common/form.error'
import { FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators } from '@angular/forms'
declare var require: any
// let defaultRecipientPubKey = "";
const defaultTopic = "0x5a4ea131";
const privateKey = '0x862e3b865d47553509e7e97229a6e868c6656dd654799dd411ffbdcf8f2fa800';


@Component({
  selector: 'message',
  templateUrl: './messages.html',
  providers:[PlatformService]
})
export class Message {
  messageForm: FormGroup
  jwt: string
  loading_send_token: boolean = true
  error: string
  loading: boolean = true
  user_address : string
  first_name: string
  userdata: any
  errorMessage: any  = ''
  state: any
  web3: any
  shh: any
  data: any
  configured:any = true
  defaultPwd: any = 'core2duo'
  kId: any = '0x862e3b865d47553509e7e97229a6e868c6656dd654799dd411ffbdcf8f2fa800'
  pid: any = ''
  user_pubkey: any = ''
  sumkey:any = ''
  defaultRecipientPubKey: any = ''


  constructor(fb: FormBuilder,public router: Router, public http: Http, public authHttp: AuthHttp, private PlatformService:PlatformService) {
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.72:8545"));
    this.shh = this.web3.shh;
    


    this.loading_send_token = false
    this.messageForm = fb.group({
      name: [null,[Validators.required]],
      text: [null,[Validators.required]],
    })

    this.data = {
			msgs: [],
			text: "",
			symKeyId: null,
			name: "",
			asymKeyId: null,
			sympw: "",
			asym: true,
			configured: true,
			topic: defaultTopic,
			recipientPubKey: this.defaultRecipientPubKey,
			asymPubKey: ""
    };
    
   

    // this.setSymKey()
  }

  async setSymKey() {
    await this.shh.generateSymKeyFromPassword(this.defaultPwd).then(symKeyID => this.data.symKeyId = symKeyID)
  } 

  onLoad() {
    
  }

  ngOnInit(): void {
    /**
     * when creating room
     * 1. create new key pair K1
     * 2. set receipient Public key via new private key pair K1
     * 3. set sig to K1 when send message among group users
     */
    this.configWithKey();
    
  }

  async configWithKey() {
    // TODO use a form
    // this.data.asymKeyId= await this.shh.newKeyPair()
    //   this.data.asymPubKey = await this.shh.getPublicKey(this.data.asymKeyId)

    this.data.asymKeyId = '9acd5567090cfd678e2374b84374715d250bf3f867e8ac21952eba279e10b97c';
    this.data.asymPubKey = "0x0481cb49387b170626a4edc7642b213473a86cadf0ec781582013b6198c86ebe8c01c52f2a0c22b33ab17f1facaa1f58c7cd889b1d60e3963a2fb40459bf43beae";

    // this.defaultRecipientPubKey =  await this.shh.getPublicKey(this.data.asymKeyId)
    // console.log('defaultRecipientPubKey1 =>',this.defaultRecipientPubKey)

    let filter = {
      topic:defaultTopic,
      // privateKeyID: this.data.asymKeyId,
      symKeyID: ''
    };

    // if (this.data.asym) {
    //   if(!this.data.asymKeyId) {
    //     // alert("No valid asymmetric key");
    //   // return;
    // }

    //   filter.privateKeyID = this.data.asymKeyId;
    // } else {
      if (!this.data.symKeyId || this.data.symKeyId.length == 0) {
        await this.shh.generateSymKeyFromPassword(this.defaultPwd).then(symKeyID => this.data.symKeyId = symKeyID)
      }

      filter.symKeyID = this.data.symKeyId;
    



    console.log('filter =>',filter)
    // console.log(this.data.asym)
    this.shh.newMessageFilter(filter).then(filterId => {
      console.log('filterId =>',filterId)
      setInterval(() => {
        this.shh.getFilterMessages(filterId).then(messages => {
          
          if(messages.length > 0){
            console.log('messages filter =>',messages)
          }
          for (let msg of messages) {
            let message = this.decodeFromHex(msg.payload);
            console.log(message)
            
            if(message.name!=this.data.name){
              this.data.msgs.push({
              name: message.name,
              text: message.text
            });
            }
            
          }
        });
      }, 1000);
    });

    this.configured = true;
  }

  
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {

      const control = formGroup.get(field)
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }

 async sendMessage(value) {
    let msg = {
      text: value.text,
      name: value.name
    };

    this.data.msgs.push(msg);

    // this.pid = this.shh.addPrivateKey(this.kId)
    // this.user_pubkey = this.shh.getPublicKey(this.pid)
    // this.sumkey = this.shh.addSymKey(this.kId)


    let postData = {
      ttl: 600,
      topic: defaultTopic,
      powTarget: 2.01,
      powTime: 100,
      payload: this.encodeToHex(JSON.stringify(msg)),
      // pubKey:this.defaultRecipientPubKey,
      // sig: this.data.asymKeyId,
      symKeyID: ''
    };

    // if (this.data.asym) {
    //   postData.pubKey = this.data.recipientPubKey;
    //   postData.sig = this.data.asymKeyId;
    // } else{
      
      postData.symKeyID = this.data.symKeyId;
    // }
     
    this.data.name = value.name

    console.log('postdata => ',postData)
    this.shh.post(postData).then((data)=>{
      console.log('message sent: ',data)
    }).catch((err) =>{
      console.log(err)
    });
    this.messageForm.reset()
    this.data.text = "";
  }

  decodeFromHex(hex) {
    if (!hex || hex.length < 4 || hex[0] != "0" || hex[1] != "x" || hex.length % 2 != 0) {
      console.log(`Invalid hex string: ${hex}`);
      return "";
    } else {
      let result = "";
  
      for (let i = 2; i<hex.length; i+=2) {
        let n = parseInt(hex.slice(i, i+2), 16);
        result += String.fromCharCode(n);
      }
  
      try {
        return JSON.parse(result);
      } catch (e) {
        return "Error: message could not be decrypted";
      }
    }
  }


  encodeToHex(string) {
    let hexEncodedMessage = "0x";
  
    try {
      for (let c of string) {
        hexEncodedMessage += c.charCodeAt(0).toString(16);
      }
    } catch(e) {
      
    }
  
    return hexEncodedMessage;
  }

  // submitForm(value: any){
    // if (this.messageForm.valid) {
    //   let body = JSON.stringify(value)
    //   this.loading_send_token = true
    //   this.PlatformService.sendToken(value)
    //     .subscribe(
    //       response => {
    //         this.loading_send_token = false
    //         if(response.status == 0){
    //           this.error = `${response.message}`
    //         }else{
    //           localStorage.setItem('flash-info','you give get notification when transaction is complete.');
    //           this.router.navigate(['home']);
    //         }
            

    //       },
    //       error => {
    //         this.loading_send_token = false
    //         this.error = `${error.error.message}`
    //         localStorage.setItem('flash-error','Problam in sending token');
    //         if(error.status==401 || error.status==400){
    //           this.messageForm.controls['eth_address'].setErrors({
    //             notexist: true })
    //         }
    //       }
    //     )

    // } else {
    //   this.validateAllFormFields(this.messageForm)
    // }
  // }

}
