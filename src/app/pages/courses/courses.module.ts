import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';


@NgModule({
  declarations: [CoursesComponent, AllCoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
  ]
})
export class CoursesModule { }
