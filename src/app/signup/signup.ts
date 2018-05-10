import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { FormErrorComponent } from '../common/form.error';
import { PlatformService } from '../services/platform';
import { FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators } from '@angular/forms';
declare var require: any;
const styles   = require('./signup.css');
const template = require('./signup.html');

@Component({
  selector: 'signup',
  templateUrl: './signup.html',
  styleUrls: [ './signup.css' ],
  providers:[PlatformService]
})
export class Signup {


  signupForm : FormGroup;
  authenticated: boolean
  profile : Object;
  error: string;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(public router: Router, public http: Http,public fb: FormBuilder,private PlatformService: PlatformService) {
    console.log(localStorage.getItem('id_token'))
      this.signupForm = fb.group({
        email: [null,[Validators.required,Validators.pattern(this.emailPattern)]],
        password:[null,[Validators.required,Validators.minLength(8),Validators.maxLength(16)]],
        user_type: [2,[Validators.required]],
      })
  }

  signup(body: any) {
    if (this.signupForm.valid) {



      this.PlatformService.register(body)
        .subscribe(
          response => {
            console.log(response.data)
            if(response.data.access_token!==undefined){
              localStorage.setItem('flash-info','congrats, you will get 1000 AT$ token which will credited your account in some moment!!!');
              // return
              localStorage.setItem('id_token', response.data.access_token);
              localStorage.setItem('email', response.data.email);
              localStorage.setItem('userdata',JSON.stringify(response.data));
              localStorage.setItem('faucet_token', response.data.faucet)
              this.router.navigate(['home']);
            }


          },
          error => {
            console.log(error)
            // this.error = `${error.message}`;
            if(error.status==401){
              this.signupForm.controls['email'].setErrors({
                exists: true });
            }
          }
        );

    } else {
      this.validateAllFormFields(this.signupForm);
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

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

}
