import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { contentHeaders } from '../common/headers';
import { FormErrorComponent } from '../common/form.error';
import { PlatformService } from '../services/platform';
import { FormBuilder,
  FormControl,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators } from '@angular/forms';
declare var require: any;
const styles   = require('./login.css');
let template_login = require('./login.html');

@Component({
  selector: 'login',
  template: template_login,
  styles: [ styles ],
  providers: [PlatformService]
})
export class Login {


  // We are going to declare our variables here. We’ll have a loginForm that will represent our reactive form, an authenticated boolean that will be true or false based on the users auth status and finally a profile object that will hold the user data.
  loginForm : FormGroup;
  authenticated: boolean
  profile : Object;
  error: string;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(fb: FormBuilder, public http: Http, public router: Router, private PlatformService: PlatformService){

    // We’ll check if the user is logged in once this component is loaded. We’ll do this by checking if a jwt key value pair exists in local storage.
    if(localStorage.getItem('jwt')){
      this.authenticated = true;
      // If the jwt key value exists, we’ll know the user is logged in, so we’ll get their profile.
      this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    // For our form, we’ll just have two fields and we’ll require both of them to be filled out before the form can be submitted
    this.loginForm = fb.group({
      email: [null, [Validators.required,Validators.pattern(this.emailPattern)]],
      password: [null, [Validators.required]],
      user_type: [2,[Validators.required]],
    })

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    } 
  }



  submitForm(value: any){
      if (this.loginForm.valid) {
        let body = JSON.stringify(value);
        console.log(body)
        this.PlatformService.login(value)
          .subscribe(
            response => {
              console.log(response)
              if(response.status == 0){
                // this.error = `${response.messages.msg}`;

                this.loginForm.controls['email'].setErrors({
                  notexist: true });
              }else{
                console.log(response.data.access_token)
                localStorage.setItem('faucet_token', response.data.faucet)
                localStorage.setItem('id_token', response.data.access_token);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('userdata',JSON.stringify(response.data));
                if(localStorage.getItem('id_token')!==null){
                  this.router.navigated = false;
                  this.router.navigate(['home']);
                  // window.location.href='/home'

                }
                
              }

            },
            error => {
              console.log(error)
              // this.error = `${error._body.messages.msg}`;
              if(error.status==401){
                this.loginForm.controls['email'].setErrors({
                  notexist: true });
              }
            }
          );



      } else {
        this.validateAllFormFields(this.loginForm);
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



  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}
