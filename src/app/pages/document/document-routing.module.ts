
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArticlesComponent } from './articles/articles.component';
import { DocumentComponent } from './document.component';
import { DocumentsComponent } from './documents/documents.component';




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
      ],
    },

  ];


  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DocumentRoutingModule { }
