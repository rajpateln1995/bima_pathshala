import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { SanchalakComponent } from './sanchalak/sanchalak.component';
import { GuruComponent } from './guru/guru.component';
import { ShishyaComponent } from './shishya/shishya.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NbSelectModule,  NbButtonModule, NbInputModule, NbRadioModule, NbDatepickerModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgOtpInputModule } from 'ng-otp-input';



@NgModule({
  declarations: [
    UsersComponent,
    SanchalakComponent, 
    GuruComponent, 
    ShishyaComponent,
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
    NgOtpInputModule,
    NbRadioModule,
    NbDatepickerModule,
  ]
})
export class UsersModule { }
