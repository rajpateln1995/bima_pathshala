import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
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
              private courses : CourseService,
              private toaster : NbToastrService)
      {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      }

  details: any;
  disable = true;
  section_name;
  section_description;
  sections;
  curriculum = [];

  ngOnInit(): void {
    this.getDetails();
  }


  getDetails(){
    this.session.getSessionDetails(this.route.snapshot.params['id']).subscribe(res => {
      console.log(res);
      this.details = res;
      this.details = this.details.data;
      this.curriculum = this.details.curriculum;
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
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
      this.toaster.show('Upload Failed', 'Error' , { status : 'danger' });
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
        this.toaster.show('Video Uploaded Successfully', 'Video Uploaded' , { status : 'success' });
      }
    },
    err => {
      console.log(err);
      this.toaster.show('Upload Failed', 'Error' , { status : 'danger' });
    });
}

saveSession(){
  this.details.curriculum = this.curriculum;

  this.session.saveSession(this.details).subscribe(res => {
    console.log(res);
    this.toaster.show('Section Saved Successfully', 'Section Saved' , { status : 'success' });
  },
  err => {
    console.log(err);
    this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
  })

}

createSection(form) {
  const obj = {
    name: this.section_name,
    description : this.section_description,
    data: [],
  }
  this.courses.createSection(obj).subscribe((res: any) => {
    console.log(res);
    form.resetForm();
    this.details.curriculum.push(res.data);
    this.saveSession();
    document.getElementById('close-section').click();
    this.toaster.show('Section Created Successfully', 'Section Crested' , { status : 'success' });
  },
  err => {
    console.log(err);
    this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
  })

}

config = {
  hours24Format : true,
  hideInputContainer :false,
  
}


}
