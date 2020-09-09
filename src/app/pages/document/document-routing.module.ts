
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
          path: 'documents',
          component: DocumentsComponent,
        },
        {
          path: 'articles',
          component: ArticlesComponent,
        },
      ],
    },

  ];


  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DocumentRoutingModule { }
