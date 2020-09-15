
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArticlesComponent } from './articles/articles.component';
import { DocumentComponent } from './document.component';
import { DocumentsComponent } from './documents/documents.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { EditDocumentRouteComponent } from './edit-document-route/edit-document-route.component';




const routes: Routes = [
    {
      path: '',
      component: DocumentComponent,
      children: [
        {
            path: '',
            redirectTo: 'documents',
            pathMatch: 'full',
        },
        {
          path: 'documents',
          component: DocumentsComponent,
        },
        {
          path: 'edit',
          component: EditDocumentComponent,
          children: [
            {
              path: 'id/:id/:status',
              component: EditDocumentRouteComponent,
            }
          ]
        },
      ],
    },
    

  ];


  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DocumentRoutingModule { }
