import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosComponent } from './videos.component';
import { AllVideosComponent } from './all-videos/all-videos.component';


const routes: Routes = [
  {
    path: '',
    component: VideosComponent,
    children: [
      {
          path: '',
          redirectTo: 'all-videos',
          pathMatch: 'full',
      },
      {
        path: 'all-videos',
        component: AllVideosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
