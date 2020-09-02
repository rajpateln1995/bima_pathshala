import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { NbIconModule, NbButtonModule, NbInputModule, NbCardModule, NbCheckboxModule, NbTabsetModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule } from '@angular/forms';
import { EditCourseComponent } from './edit-course/edit-course.component';



@NgModule({
  declarations: [CoursesComponent, AllCoursesComponent, EditCourseComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    NbIconModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbInputModule,
    FormsModule,
    NbCheckboxModule,
    NbTabsetModule,
    NbCardModule,
  ],
})
export class CoursesModule { }
