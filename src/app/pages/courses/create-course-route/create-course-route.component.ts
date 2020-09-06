import { Component, OnInit, ɵConsole } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
// import { CreateCourseSectionRouteComponent } from '../create-course-section-route/create-course-section-route.component';

@Component({
  selector: 'ngx-create-course-route',
  templateUrl: './create-course-route.component.html',
  styleUrls: ['./create-course-route.component.scss'],
})
export class CreateCourseRouteComponent implements OnInit {

  constructor(private courses: CourseService,
              private route: ActivatedRoute,
              private router: Router)
{
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
}
  id;
  details: any;
  SectionName;
  SectionDescription;
  
  ngOnInit(): void {

    this.getCourse();

  }

  getCourse(){
    this.id = this.route.snapshot.params['id']; 
    this.courses.getCourseDetails(this.id).subscribe(res => {
      console.log(res);
      const data: any = res;
      this.details = data.data;
    },
    err => {
      console.log(err);
    });
  }

  createSection(form){
    console.log(this.route.snapshot.params['id']);
    const obj = {
      'name' : this.SectionName,
      'description' : this.SectionDescription,
      'course' : this.route.snapshot.params['id'],
    };
    console.log(obj);
    this.courses.createSection(obj).subscribe(res => {
      console.log(res);
      
      document.getElementById('close-section').click();
      form.resetForm();
      this.getCourse();
    }, err => {
      console.log(err);
      document.getElementById('close-section').click();
    });
  }




}
