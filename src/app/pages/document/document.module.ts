import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';
import { DocumentsComponent } from './documents/documents.component';
import { ArticlesComponent } from './articles/articles.component';
import { DocumentRoutingModule } from './document-routing.module';




@NgModule({
  declarations: [DocumentComponent, DocumentsComponent, ArticlesComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
  ]
})
export class DocumentModule { }
