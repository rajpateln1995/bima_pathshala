import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { CourseService } from '../../../services/course.service';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss']
})
export class AllVideosComponent implements OnInit {

  constructor(private video : VideoService,
              private courses: CourseService,
              private router : Router,
              private toaster : NbToastrService) { }

  data: any;
  table_head = [
    'Name',
    'Type',
    'Length',
    'Language',
    'Status',
    'Preview',
    'Edit'
  ];
  total;
  languages = [];
  videoTitle;
  videoType;
  curr_page = 1;
  limit = '50';

  ngOnInit(): void {
    this.getAllVideos('1');
  }

  getAllVideos(page){
    this.video.getVideos(this.limit, page, 'true').subscribe(res => {
      console.log(res);
      const temp: any = res;
      this.data = temp.data;
      this.total = temp.total;
    },
    err => {
      console.log(err)
    })
  }



  getPage(page){
    this.curr_page = page;
    this.getAllVideos(page);
  }

  changeLimit(limit){
    this.limit = limit;
    this.getAllVideos('1');
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
        this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
      });
    }

  }

  viewVideo(id, status){
    console.log(id);
    this.video.getVideoDetails(id).subscribe(res => {
      console.log(res);
      const temp : any = res;
      const obj = temp.data.video.otherLanguages;
      localStorage.setItem('video-list',JSON.stringify({data : obj}));
      this.router.navigateByUrl(`pages/videos/edit/id/${id}/${status}`);
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
    })
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
      this.router.navigateByUrl(`pages/videos/edit/id/${temp.data[0].otherLanguages[0].video}/0`)
      document.getElementById('close-btn').click();
      this.toaster.show('Videos Created Successfully', 'Videos Created' , { status : 'success' });
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
    });

  }

  status = [
    'Not Completed',
    'Verified',
    'Live',
    'Disabled',
    'Deleted',
  ]

}
