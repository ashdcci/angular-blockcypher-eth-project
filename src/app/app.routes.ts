import { Routes } from '@angular/router';
import { Login } from './login';
import { Signup } from './signup';
import { Home } from './home';
import { Profile } from './user/profile';
import { Message } from './message';
import { BitcoinTransactions } from './user/transactions/bitcoin';
import { EthTransactions } from './user/transactions/eth'
import { TokenTransactions } from './user/transactions/tokens'
import { AuthGuard } from './common/auth.guard';
import { NonAuthGuard } from './common/nonauth.guard';
import {AuthResetPassword} from './common/authresetpassword';
import { SendBitcoin } from './transfers/bitcoin'
import { SendEth } from './transfers/eth'
import { SendToken } from './transfers/tokens'

export const routes: Routes = [
  { path: 'chat', component: Message},
  { path: '',       component: Login, canActivate: [NonAuthGuard] },
  { path: 'login',  component: Login, canActivate: [NonAuthGuard] },
  { path: 'signup', component: Signup, canActivate: [NonAuthGuard] },
  { path: 'home',   component: Home, canActivate: [AuthGuard] },
  { path: 'profile',   component: Profile, canActivate: [AuthGuard] },
  { path: 'bitcoin-transactions',   component: BitcoinTransactions, canActivate: [AuthGuard] },
  { path: 'eth-transactions',   component: EthTransactions, canActivate: [AuthGuard] },
  { path: 'token-transactions',   component: TokenTransactions, canActivate: [AuthGuard] },
  { path: 'send-bitcoin', component: SendBitcoin, canActivate:[AuthGuard]},
  { path: 'send-eth', component: SendEth, canActivate:[AuthGuard]},
  { path: 'send-token', component: SendToken, canActivate:[AuthGuard]},
  
  // { path: '**',     component: NotFound },
];
