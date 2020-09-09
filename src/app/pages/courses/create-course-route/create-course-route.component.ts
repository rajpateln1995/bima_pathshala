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
      this.details = data.data.course;
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
  coverimage;
  uploadImage(event){
    const data = event.target.files[0];
    this.courses.upload(data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        console.log(event);
        
      }else if (event.type === HttpEventType.Response){
        console.log(event);
        const data:any = event;
        this.coverimage = data.body.data[0];
      }
    },
    err => {
      console.log(err);
    });
  }
  covervideo
  uploadVideo(event){
      const data = event.target.files[0];
      this.courses.upload(data).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress){
          console.log(event);
          
        }else if (event.type === HttpEventType.Response){
          console.log(event);
          const data:any = event;
          this.covervideo = data.body.data[0];
        }
      },
      err => {
        console.log(err);
      });
  }

  saveCourse(){
    const obj = {
      title: this.details.name,
      description : this.details.description,
      coverImage : this.coverimage,
      coverVideo : this.covervideo,
      _id : this.route.snapshot.params['id']
    }
    this.courses.putCourse(obj).subscribe(res => {
      console.log(res);
      this.getCourse();
    },
    err => {
      console.log(err);
    })
  }






}
