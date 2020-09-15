import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CreateComponent } from './create/create.component';
import { CreateCourseRouteComponent } from './create-course-route/create-course-route.component';


const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      {
        path: '',
        redirectTo: 'all-courses',
        pathMatch: 'full',
      },
      {
        path: 'all-courses',
        component: AllCoursesComponent,
      },
      {
        path: 'edit',
        component: EditCourseComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
        children: [
          {
            path: 'id/:id/:status',
            component: CreateCourseRouteComponent,
          },
        ],
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
