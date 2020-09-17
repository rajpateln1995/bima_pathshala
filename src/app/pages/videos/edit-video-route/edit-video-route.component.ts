import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { CourseService } from '../../../services/course.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-video-route',
  templateUrl: './edit-video-route.component.html',
  styleUrls: ['./edit-video-route.component.scss'],
})
export class EditVideoRouteComponent implements OnInit {

  constructor(private video: VideoService,
              private route: ActivatedRoute,
              private courses: CourseService,
              private router: Router,
              private toaster : NbToastrService) {

  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
}
  Data: any;
  video_name;
  video_description;

  ngOnInit(): void {
    this.getVideoDetails();

  }

  getVideoDetails(){
    console.log(this.route.snapshot.params['id']);
    this.video.getVideoDetails(this.route.snapshot.params['id']).subscribe(res => {
      console.log(res);
      const temp: any = res;
      this.Data = temp.data.video;
      this.video_name = this.Data.name;
      this.video_description = this.Data.description;
      console.log(this.Data);
    },
    );
  }


  mediaUrl;
  disableBtn;
  progressVideo = '0';
  upload(event){

    const data = event.target.files[0];
    this.courses.upload(data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        console.log(event);
        this.progressVideo = ((event.loaded / event.total) * 100).toString();
      }else if (event.type === HttpEventType.Response){
        console.log(event);
        const data: any = event;
        this.mediaUrl = data.body.data[0];
        this.disableBtn = false;
        this.progressVideo = '0';
        this.toaster.show('File Uploaded Successfully', 'File Uploaded' , { status : 'success' });
      }
    },
    err => {
      console.log(err);
      this.progressVideo = '0';
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
    });
  }

  thumbUrl;
  progressThumb = '0';
  uploadThumb(event){
    const data = event.target.files[0];
    this.courses.upload(data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        console.log(event);
        this.progressThumb = ((event.loaded / event.total) * 100).toString();
      }else if (event.type === HttpEventType.Response) {
        console.log(event);
        const data: any = event;
        this.progressThumb = '0';
        this.thumbUrl = data.body.data[0];
        this.disableBtn = false;
        this.toaster.show('File Uploaded Successfully', 'File Uploaded' , { status : 'success' });
      }
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
      this.progressThumb = '0';
    });
  }
    

  


  save(){
    console.log(this.mediaUrl);
    const obj = {
      name : this.video_name,
      description : this.video_description,
      videoUrl : this.mediaUrl,
      _id : this.Data._id,
      thumb : this.thumbUrl,
    };
    this.video.saveVideo(obj).subscribe(res => {
      console.log(res);
      this.getVideoDetails();
      this.toaster.show('Details Saved Successfully', 'Saved Successfully' , { status : 'success' });
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
    });
  }

  ngOnDestroy() {
    this.save();
  }

}
