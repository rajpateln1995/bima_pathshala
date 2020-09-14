import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { NbIconModule, NbButtonModule, NbInputModule, NbCardModule, NbCheckboxModule, NbTabsetModule, NbAccordionModule, NbRouteTabsetModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule } from '@angular/forms';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CreateComponent } from './create/create.component';
import { CreateCourseRouteComponent } from './create-course-route/create-course-route.component';
import { CreateCourseSectionRouteComponent } from './create-course-section-route/create-course-section-route.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { NgxPaginationModule } from 'ngx-pagination';






@NgModule({
  declarations: [CoursesComponent, AllCoursesComponent, EditCourseComponent, CreateComponent, CreateCourseRouteComponent, CreateCourseSectionRouteComponent, AssessmentsComponent],
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
    NbAccordionModule,
    NbRouteTabsetModule,
    NgxPaginationModule,
  ],
})
export class CoursesModule { }
