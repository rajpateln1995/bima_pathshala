import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosComponent } from './videos.component';
import { AllVideosComponent } from './all-videos/all-videos.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { EditVideoRouteComponent } from './edit-video-route/edit-video-route.component';


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
      {
        path: 'edit',
        component: EditVideoComponent,
        children: [
          {
            path: 'id/:id/:status',
            component: EditVideoRouteComponent,
          }
        ]
      },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
