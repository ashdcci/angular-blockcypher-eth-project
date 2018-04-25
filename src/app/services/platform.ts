import {Injectable} from '@angular/core';
import {Http,RequestOptionsArgs} from '@angular/http'
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {Headers} from '@angular/http'
import {RequestOptions} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { contentHeaders } from '../common/headers';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class PlatformService{

  baseUrl :string =  'http://localhost:3003/'
  PlatformcontentHeaders: any = new HttpHeaders()
	constructor(private http:HttpClient){

    this.PlatformcontentHeaders = contentHeaders
	}

  login(body: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + 'user/login',body,{ headers: this.PlatformcontentHeaders }).map(res => res).catch( err => this.handleError(err))
  }

  register(body: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + 'user/register',body, { headers: this.PlatformcontentHeaders}).map(res => res).catch( err => this.handleError(err))
  }

  getUserBalance(): Observable<any> {

    this.PlatformcontentHeaders = this.PlatformcontentHeaders.set('x-access-token', localStorage.getItem('id_token'));
    return this.http.post<any>(this.baseUrl + 'address/getAddressBalance','',{headers:this.PlatformcontentHeaders}).map((res:any) => res).catch( err => this.handleError(err))
  }

  getSendMoney(): Observable<any> {
    this.PlatformcontentHeaders = this.PlatformcontentHeaders.set('x-access-token', localStorage.getItem('id_token'));
    return this.http.get<any>(this.baseUrl + 'transaction/getSendMoney',{headers:this.PlatformcontentHeaders}).map(res => res).catch( err => this.handleError(err))
  }


  getRecdMoney(): Observable<any> {
    this.PlatformcontentHeaders = this.PlatformcontentHeaders.set('x-access-token', localStorage.getItem('id_token'));
    return this.http.get<any>(this.baseUrl + 'transaction/getRecdMoney',{headers:this.PlatformcontentHeaders}).map(res => res).catch( err => this.handleError(err))
  }

  editProfile(body: any): Observable<any> {
    this.PlatformcontentHeaders = this.PlatformcontentHeaders.set('x-access-token', localStorage.getItem('id_token'));
    return this.http.put<any>(this.baseUrl  +  'user/edit-profile',body,{headers:this.PlatformcontentHeaders}).map(res => res).catch( err => this.handleError(err))
  }

  sendToken(body: any): Observable<any> {
    this.PlatformcontentHeaders = this.PlatformcontentHeaders.set('x-access-token', localStorage.getItem('id_token'));
    return this.http.post<any>(this.baseUrl + 'transaction/create', body, {headers: this.PlatformcontentHeaders} ).map(res => res).catch( err => this.handleError(err))
  }

  getTransactionsList(body: any): Observable<any> {
    this.PlatformcontentHeaders = this.PlatformcontentHeaders.set('x-access-token', localStorage.getItem('id_token'));
    return this.http.post<any>(this.baseUrl+'transaction/getTransactions', body, {headers: this.PlatformcontentHeaders} ).map(res => res).catch( err => this.handleError(err))
  }

  getTokenBalance() : Observable<any>{
    this.PlatformcontentHeaders = this.PlatformcontentHeaders.set('x-access-token', localStorage.getItem('id_token'));
    return this.http.post<any>(this.baseUrl+'contract/getTokenBalance', {}, {headers: this.PlatformcontentHeaders}).map(res => res).catch( err => this.handleError(err))
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, `  +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };


}
