import {Injectable} from '@angular/core';
import {Http,RequestOptionsArgs} from '@angular/http'
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {Headers} from '@angular/http'
import {RequestOptions} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { contentHeaders } from '../common/headers';

@Injectable()
export class PlatformService{

  baseUrl :string =  'http://localhost:3003/'
	constructor(private http:HttpClient){
	}

  login(body: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + 'user/login',body,{ headers: contentHeaders })
              .map(res => res)
  }

  register(body: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + 'user/register',body, { headers: contentHeaders}).map(res => res)
  }

  getUserBalance(): Observable<any> {
    console.log(contentHeaders)
    return this.http.post<any>(this.baseUrl + 'address/getAddressBalance','',{headers:contentHeaders}).map((res:any) => res)
  }

  getSendMoney(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'transaction/getSendMoney',{headers:contentHeaders}).map(res => res)
  }


  getRecdMoney(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'transaction/getRecdMoney',{headers:contentHeaders}).map(res => res)
  }

  editProfile(body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl  +  'user/edit-profile',body,{headers:contentHeaders}).map(res => res)
  }

  sendToken(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'transaction/create', body, {headers: contentHeaders} ).map(res => res)
  }

  getTransactionsList(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'transaction/getTransactions', body, {headers: contentHeaders} ).map(res => res)
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
