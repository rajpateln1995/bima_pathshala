import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';
import { DocumentsComponent } from './documents/documents.component';
import { ArticlesComponent } from './articles/articles.component';
import { DocumentRoutingModule } from './document-routing.module';
import { NbIconModule, NbButtonModule, NbInputModule, NbCheckboxModule, NbTabsetModule, NbCardModule, NbAccordionModule, NbRouteTabsetModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [DocumentComponent, DocumentsComponent, ArticlesComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    NbIconModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbInputModule,
    FormsModule,
    NbCheckboxModule,
    NbTabsetModule,
    NbCardModule,
    NbAccordionModule,
    NbRouteTabsetModule,
  ]
})
export class DocumentModule { }
