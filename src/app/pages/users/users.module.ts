import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { SanchalakComponent } from './sanchalak/sanchalak.component';
import { GuruComponent } from './guru/guru.component';
import { ShishyaComponent } from './shishya/shishya.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NbSelectModule,  NbButtonModule, NbInputModule, NbRadioModule, NbDatepickerModule, NbListModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { UserDetailsComponent } from './user-details/user-details.component';
import { NbMomentDateModule } from '@nebular/moment';



@NgModule({
  declarations: [
    UsersComponent,
    SanchalakComponent, 
    GuruComponent, 
    ShishyaComponent, UserDetailsComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgxPaginationModule,
    NbSelectModule,
    FormsModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbInputModule,
    Ng2SearchPipeModule,
    NbRadioModule,
    NbDatepickerModule,
    NbListModule,
    NbMomentDateModule,
  ]
})
export class UsersModule { }
