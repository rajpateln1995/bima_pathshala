import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      loadChildren: () => import('./home/home.module')
        .then(m => m.HomeModule),
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'courses',
      loadChildren: () => import('./courses/courses.module')
        .then(m => m.CoursesModule),
    },
    {
      path: 'document',
      loadChildren: () => import('./document/document.module')
        .then(m => m.DocumentModule),
    },
    {
      path: 'videos',
      loadChildren: () => import('./videos/videos.module')
        .then(m => m.VideosModule),
    },
    {
      path: 'sessions',
      loadChildren: () => import('./sessions/sessions.module')
        .then(m => m.SessionsModule),
    },
    {
      path: 'expense-manager',
      loadChildren: () => import('./expense-manager/expense-manager.module')
        .then(m => m.ExpenseManagerModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
