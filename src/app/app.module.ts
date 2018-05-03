import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { HttpModule,Http, RequestOptions } from '@angular/http'
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { Login } from './login'
import { Signup } from './signup'
import { Home } from './home'
import { Profile } from './user/profile'
import { FormErrorComponent } from './common/form.error'
import { AUTH_PROVIDERS, AuthHttp,AuthConfig } from 'angular2-jwt'
import { DataFilterPipe } from './common/data-filter.pipe'
import { AppComponent } from './app.component'
import { routes } from './app.routes'
import { AuthGuard } from './common/auth.guard'
import { NonAuthGuard } from './common/nonauth.guard'
import { AdminHeader } from './components/header/header'
import { AdminFooter } from './components/footer/footer'
import { AsideComponent } from './components/aside/aside'
import { PlatformService } from './services/platform'
import { Interceptor } from './common/interceptors'
import { SendBitcoin } from './transfers/bitcoin'
import { SendEth } from './transfers/eth'
import { SendToken } from './transfers/tokens'
import { Transactions } from './user/transactions'
import { FlashMessagesModule } from 'angular2-flash-messages'
import { ToastModule } from 'ng2-toastr/ng2-toastr'
import { DataTableModule } from "angular2-datatable"


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options)
}

@NgModule({
  declarations: [
    AppComponent,
    Login,
    Signup,
    DataFilterPipe,
    FormErrorComponent,
    Home,
    AdminHeader,
    AdminFooter,
    Profile,
    AsideComponent,
    SendBitcoin,
    SendToken,
    SendEth,
    Transactions
  ],
  imports: [
    HttpModule,HttpClientModule, BrowserModule, FormsModule,ReactiveFormsModule,
    FlashMessagesModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    DataTableModule
  ],
  providers: [
    AuthGuard,NonAuthGuard,AuthHttp,Location,{provide: LocationStrategy, useClass: PathLocationStrategy},PlatformService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
