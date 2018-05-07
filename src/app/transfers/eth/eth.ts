import { Component } from '@angular/core'
import { Http } from '@angular/http'
import { Router } from '@angular/router'
import { AuthHttp } from 'angular2-jwt'
import {PlatformService} from '../../services/platform'
import { contentHeaders } from '../../common/headers'
import { FormErrorComponent } from '../../common/form.error'
import { FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators } from '@angular/forms'
declare var require: any

const template = require('./eth.html')

@Component({
  selector: 'profile',
  template: template,
  providers:[PlatformService]
})
export class SendEth {
  ethFrom: FormGroup
  jwt: string
  balance: any = 0
  loading_send_token: boolean = true
  eth_address: string
  error: string
  loading: boolean = true
  user_address : string
  first_name: string
  last_name: string
  email: string
  userdata: any
  constructor(fb: FormBuilder,public router: Router, public http: Http, public authHttp: AuthHttp, private PlatformService:PlatformService) {
    
    this.loading_send_token = false
    this.jwt = localStorage.getItem('id_token');
    this.userdata = JSON.parse(localStorage.getItem('userdata'))
    this.userdata.first_name = localStorage.getItem('first_name')
    this.userdata.last_name = localStorage.getItem('last_name')
    console.log(this.userdata)
    this.user_address = this.userdata.eth_address
    this.ethFrom = fb.group({
      eth_address: [null,[Validators.required]],
      amount:[null,[Validators.required]]
    })
  }


  onLoad() {
      
  }

  ngOnInit(): void {
    
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


  submitEth(value: any){
    if (this.ethFrom.valid) {
      let body = JSON.stringify(value)
      this.loading_send_token = true
      this.PlatformService.sendEth(value)
        .subscribe(
          response => {
            this.loading_send_token = false
            if(response.status == 0){
              this.error = `${response.messages.msg}`
            }else{
              localStorage.setItem('flash-success','ETH Send Successfully!!!');
              this.router.navigate(['home']);
            }

          },
          error => {
            this.loading_send_token = false
            console.log(error)
            this.error = `${error.message}`
            if(error.status==500){
              localStorage.setItem('flash-error','Problam in sending ETH');
            }
            
          }
        )

    } else {
      this.validateAllFormFields(this.ethFrom)
    }
  }

}
