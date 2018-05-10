import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import {PlatformService} from '../../services/platform'
import { contentHeaders } from '../../common/headers';
import { FormErrorComponent } from '../../common/form.error';
import { FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators } from '@angular/forms';
declare var require: any;

const template = require('./profile.html');

@Component({
  selector: 'profile',
  templateUrl: './profile.html',
  providers:[PlatformService]
})
export class Profile {
  profileForm : FormGroup;
  jwt: string;
  balance: any = 0
  loading: boolean = true
  user_address : string
  first_name: string
  last_name: string
  email: string
  userdata: any
  error: string;
  errorMessage: any  = ''
  state: any
  source: any = ''
  constructor(fb: FormBuilder,public router: Router, public http: Http, public authHttp: AuthHttp, private PlatformService:PlatformService) {
    this.jwt = localStorage.getItem('id_token');
    this.userdata = JSON.parse(localStorage.getItem('userdata'))
    this.userdata.first_name = localStorage.getItem('first_name')
    this.userdata.last_name = localStorage.getItem('last_name')

    this.user_address = this.userdata.user_address
    this.first_name = (localStorage.getItem('first_name')) ? localStorage.getItem('first_name')  : this.userdata.first_name
    this.last_name = (localStorage.getItem('last_name')) ? localStorage.getItem('last_name') : this.userdata.last_name
    this.email = this.userdata.email

    this.profileForm = fb.group({
      first_name: [null,[Validators.required]],
      last_name:[null,[Validators.required]]
    })
  }


  onLoad() {
      this.loading = false;
  }

  ngOnInit(): void {
    this.PlatformService.getUserBalance().subscribe(response=>{
        this.loading = false;
        this.balance = response.body.final_balance * 0.00000001 +' ฿'
    },
    error=>{
      console.log(error)
    })

  }

  submitForm(value: any){
      if (this.profileForm.valid) {
        let body = JSON.stringify(value);
        this.PlatformService.editProfile(value)
          .subscribe(
            response => {
              console.log(response)
              if(response.status == 0){
                this.error = `${response.messages.msg}`;
              }else{
                localStorage.setItem('first_name', value.first_name);
                localStorage.setItem('last_name', value.last_name);
                localStorage.setItem('flash-success','Your Profile is Updated');
                this.router.navigate(['home']);
              }

            },
            error => {

              // this.error = `${error._body.messages.msg}`;
              localStorage.setItem('flash-success','problam in profile updation');
              if(error.status==401){
                this.profileForm.controls['email'].setErrors({
                  notexist: true });
              }
            }
          );



      } else {
        this.validateAllFormFields(this.profileForm);
      }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {

      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
