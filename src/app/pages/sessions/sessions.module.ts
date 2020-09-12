import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionsComponent } from './sessions.component';
import { AllSessionsComponent } from './all-sessions/all-sessions.component';


@NgModule({
  declarations: [SessionsComponent, AllSessionsComponent],
  imports: [
    CommonModule,
    SessionsRoutingModule
  ]
})
export class SessionsModule { }
