import { Routes } from '@angular/router';
import { Login } from './login';
import { Signup } from './signup';
import { Home } from './home';
import { Profile } from './user/profile';
import { Transactions } from './user/transactions';
import { AuthGuard } from './common/auth.guard';
import { NonAuthGuard } from './common/nonauth.guard';
import {AuthResetPassword} from './common/authresetpassword';
import { SendToken } from './send_token'

export const routes: Routes = [
  { path: '',       component: Login, canActivate: [NonAuthGuard] },
  { path: 'login',  component: Login, canActivate: [NonAuthGuard] },
  { path: 'signup', component: Signup, canActivate: [NonAuthGuard] },
  { path: 'home',   component: Home, canActivate: [AuthGuard] },
  { path: 'profile',   component: Profile, canActivate: [AuthGuard] },
  { path: 'transactions',   component: Transactions, canActivate: [AuthGuard] },
  { path: 'sendToken', component: SendToken, canActivate:[AuthGuard]}
  // { path: '**',     component: NotFound },
];
