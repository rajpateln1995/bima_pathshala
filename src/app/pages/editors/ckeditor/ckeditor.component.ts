import { Component } from '@angular/core';

import './ckeditor.loader';
import 'ckeditor';

@Component({
  selector: 'ngx-ckeditor',
  template: `
    <nb-card>
      <nb-card-header>
        CKEditor
      </nb-card-header>
      <nb-card-body>
        <ckeditor [config]="{ extraPlugins: 'divarea', height: '320' }" (change)="op($event)"></ckeditor>
      </nb-card-body>
    </nb-card>
  `,
})
export class CKEditorComponent {
  x;
  op(e){
    console.log(e)
    console.log(this.x)
  }
}
