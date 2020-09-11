import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { CourseService } from '../../../services/course.service';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss']
})
export class AllVideosComponent implements OnInit {

  constructor(private video : VideoService,
              private courses: CourseService,
              private router : Router) { }

  data: any;
  table_head = [
    'Name',
    'Type',
    'Length',
    'Language',
    'Preview',
    'Edit'
  ];
  total;
  languages = [];
  videoTitle;
  videoType;

  ngOnInit(): void {
    this.getAllVideos();
  }

  getAllVideos(){
    this.video.getVideos().subscribe(res => {
      console.log(res);
      const temp: any = res
      this.data = temp.data;
      this.total = this.data.length;
    },
    err => {
      console.log(err)
    })
  }

  getLanguages(){
    if (this.languages.length > 0){
      document.getElementById('create-video-modal').click();
    } else {
      this.courses.getLanguages().subscribe(res => {
        let lang: any = res;
        lang = lang.data;
        for (const l of lang) {
          this.languages.push({
            'name': l.name,
            'displayName' : l.displayName,
            'value' : false,
          });
        }
        console.log(this.languages);
        document.getElementById('create-video-modal').click();
      },
      err => {
        console.log(err);
      });
    }

  }

  viewVideo(id){
    console.log(id);
  } 


  progress;
  createvideo(){
    console.log('zsfd')
    this.getLanguages();
    
  }

  mediaUrl;
  
  // upload(event){
    
  //   const data = event.target.files[0];
  //   this.courses.upload(data).subscribe(event => {
  //     if (event.type === HttpEventType.UploadProgress){
  //       console.log(event);
  //       this.progress = (event.loaded / event.total) * 100;
  //     }else if (event.type === HttpEventType.Response){
  //       console.log(event);
  //       const data:any = event;
  //       this.mediaUrl = data.body.data[0];
  //       this.disableBtn = false;
  //     }
  //   },
  //   err => {
  //     console.log(err);
  //   });
  // }
  

  submit() {

    let languages = '';
    for (const lang of this.languages){
      if (lang.value){
        languages = languages + lang.name + ',';
      }
    }


    const obj = {
      type : this.videoType,
      languages : languages.slice(0, languages.length - 1),
    };
    this.video.addMultipleVideo(obj).subscribe(res => {
      console.log(res);
      const temp : any = res;
      localStorage.setItem('video-list', JSON.stringify({data : temp.data[0].otherLanguages}));
      this.router.navigateByUrl(`pages/videos/edit/id/${temp.data[0].otherLanguages[0].video}`)
      document.getElementById('close-btn').click();
      this.getAllVideos();
    },
    err => {
      console.log(err);
    });

  }

}