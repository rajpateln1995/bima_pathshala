import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { SanchalakComponent } from './sanchalak/sanchalak.component';
import { GuruComponent } from './guru/guru.component';
import { ShishyaComponent } from './shishya/shishya.component';
import { UserDetailsComponent } from './user-details/user-details.component';


const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [
    {
      path: 'sanchalak',
      component: SanchalakComponent,
    },
    {
      path: 'guru',
      component: GuruComponent,
    },
    {
      path: 'shishya',
      component: ShishyaComponent,
    },
    {
      path: 'user-details/:role/:id',
      component: UserDetailsComponent,
    },
  ],
}];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
