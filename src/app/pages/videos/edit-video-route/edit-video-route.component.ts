import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'ngx-edit-video-route',
  templateUrl: './edit-video-route.component.html',
  styleUrls: ['./edit-video-route.component.scss']
})
export class EditVideoRouteComponent implements OnInit {

  constructor(private video : VideoService,
              private route : ActivatedRoute,
              private courses : CourseService) { }
  Data : any;
  video_name;
  video_description;

  ngOnInit(): void {
    this.getVideoDetails();
    
  }

  getVideoDetails(){
    console.log(this.route.snapshot.params['id']);
    this.video.getVideoDetails(this.route.snapshot.params['id']).subscribe(res => {
      console.log(res);
      const temp:any = res;
      this.Data = temp.data.video;
      this.video_name = this.Data.name;
      this.video_description = this.Data.description;
      console.log(this.Data);
    },
    )
  }

  
  mediaUrl;
  disableBtn;
  progress;
  upload(event){
    
    const data = event.target.files[0];
    this.courses.upload(data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        console.log(event);
        this.progress = (event.loaded / event.total) * 100;
      }else if (event.type === HttpEventType.Response){
        console.log(event);
        const data:any = event;
        this.mediaUrl = data.body.data[0];
        this.disableBtn = false;
      }
    },
    err => {
      console.log(err);
    });
  }


  save(){
    console.log(this.mediaUrl);
    const obj = {
      name : this.video_name,
      description : this.video_description,
      videoUrl : this.mediaUrl,
      _id : this.Data._id,
    }
    this.video.saveVideo(obj).subscribe(res => {
      console.log(res);
      this.getVideoDetails();
    },
    err => {
      console.log(err);
    })
  }

}
