import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { SessionsService } from '../../../services/sessions.service';

@Component({
  selector: 'ngx-create-session-route',
  templateUrl: './create-session-route.component.html',
  styleUrls: ['./create-session-route.component.scss']
})
export class CreateSessionRouteComponent implements OnInit {

  constructor(private session : SessionsService,
              private route : ActivatedRoute,
              private router : Router,
              private courses : CourseService)
      {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      }

  details: any;
  disable = true;
  section_name;
  section_description;

  ngOnInit(): void {

    console.log(this.route.snapshot.params['id']);
    this.getDetails();
  }


  getDetails(){
    this.session.getSessionDetails(this.route.snapshot.params['id']).subscribe(res => {
      console.log(res);
      this.details = res;
      this.details = this.details.data;
    },
    err => {
      console.log(err);
    });
  }

  coverimage;
  progressImg;
  uploadImage(event){
    const data = event.target.files[0];
    this.courses.upload(data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        console.log(event);
        this.progressImg = (event.loaded / event.total) * 100;

      }else if (event.type === HttpEventType.Response){
        console.log(event);
        const data: any = event;
        this.coverimage = data.body.data[0];
        this.progressImg = 0;
      }
    },
    err => {
      console.log(err);
    });
  }


  progressVideo;
  covervideo;
  uploadVideo(event){
    const data = event.target.files[0];
    this.courses.upload(data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        console.log(event);
        this.progressVideo = (event.loaded / event.total) * 100;

      }else if (event.type === HttpEventType.Response){
        console.log(event);
        const data: any = event;
        this.covervideo = data.body.data[0];
        this.progressVideo = 0;
      }
    },
    err => {
      console.log(err);
    });
}

saveSession(){


  this.session.saveSession(this.details).subscribe(res => {
    console.log(res);
  },
  err => {
    console.log(err);
  })

}



createSection(form) {
  const obj = {
    title: this.section_name,
    description : this.section_description,
    data : []
  }
  this.details.curriculum.push(obj);
  console.log(this.details.curriculum);
  form.resetForm();
  document.getElementById('close-section').click();
}

temp(){
  console.log('asfasdf');
}


}
