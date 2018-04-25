import { HttpHeaders } from '@angular/common/http';

export let contentHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type':  'application/json',
  'Accept': 'application/json'
});
