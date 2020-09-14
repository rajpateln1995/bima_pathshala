import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionsComponent } from './sessions.component';
import { AllSessionsComponent } from './all-sessions/all-sessions.component';
import { FormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule, NbButtonModule, NbInputModule, NbCheckboxModule, NbTabsetModule, NbCardModule, NbAccordionModule, NbRouteTabsetModule } from '@nebular/theme';
import { CreateSessionRouteComponent } from './create-session-route/create-session-route.component';
import { CreateComponent } from './create/create.component';
import { AssignUsersComponent } from './assign-users/assign-users.component';


@NgModule({
  declarations: [SessionsComponent, AllSessionsComponent, CreateSessionRouteComponent, CreateComponent, AssignUsersComponent],
  imports: [
    CommonModule,
    SessionsRoutingModule,
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
export class SessionsModule { }
