import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';
import { AllVideosComponent } from './all-videos/all-videos.component';
import { NbIconModule, NbButtonModule, NbInputModule, NbCheckboxModule, NbTabsetModule, NbCardModule, NbAccordionModule, NbRouteTabsetModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule } from '@angular/forms';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { EditVideoRouteComponent } from './edit-video-route/edit-video-route.component';


@NgModule({
  declarations: [VideosComponent, AllVideosComponent, EditVideoComponent, EditVideoRouteComponent],
  imports: [
    CommonModule,
    VideosRoutingModule,
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
export class VideosModule { }
