import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllSessionsComponent } from './all-sessions/all-sessions.component';
import { SessionsComponent } from './sessions.component';


const routes: Routes = [
  {
    path: '',
    component: SessionsComponent,
    children: [
      {
          path: '',
          redirectTo: 'all-sessions',
          pathMatch: 'full',
      },
      {
        path: 'all-sessions',
        component: AllSessionsComponent,
      },
    ],
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class SessionsRoutingModule { }
