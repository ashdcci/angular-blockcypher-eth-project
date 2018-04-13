import { HttpHeaders } from '@angular/common/http';

export const contentHeaders = new HttpHeaders({
  'Content-Type':  'application/json',
  'Accept': 'application/json',
  'x-access-token': localStorage.getItem('id_token')
});
