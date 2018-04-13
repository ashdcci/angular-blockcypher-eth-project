import {Component,Input} from '@angular/core';

@Component({
  selector: 'error',
  template: `
    <div *ngIf="error" class="form-group form-group-sm">
      <div class="alert alert-danger col-md-10 col-sm-10" role="alert">
        
        {{error}}
      </div>
    </div>
  `
})
export class FormErrorComponent {
  @Input()
  error:string;

  close() {
    this.error = null;
  }
}
