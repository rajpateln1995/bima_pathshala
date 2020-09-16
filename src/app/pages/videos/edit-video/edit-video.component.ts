import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { VideoService } from '../../../services/video.service';

@Component({
  selector: 'ngx-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {

  constructor(private route : ActivatedRoute,
              private video : VideoService,
              private toaster : NbToastrService) { }

  

  
  languages: any;
  id: any;
  s;
  
  tempLang = {
    'HI' : 'HINDI',
    'EN' : 'ENGLISH',
    'MH' : 'MARATHI',
  };

  ngOnInit(): void {
    this.s = window.location.href.slice(-1);

    this.id = JSON.parse(localStorage.getItem('video-list'));
    const tabs = [];

    for (const id of this.id.data){
      console.log(id);
      tabs.push({
        title : this.tempLang[id.language],
        route : [`id/${id.video}/${this.s}`],
      });
    }
    this.tabs = tabs;
  }

  tabs: any[] ;

  // changeStatus(status, type: NbComponentStatus) {
  //   this.s = status;
  //   this.toaster.show(`Course Is ${this.status[this.s]}`, this.status[this.s] , { status : type });
  //   for (const data of this.id.data){

  changeStatus(status ,type : NbComponentStatus){
    this.s = status;
    this.toaster.show(`Video Is ${this.status[this.s]}`, this.status[this.s] , { status : type });
    const obj = {
      _id : this.route.firstChild.snapshot.params['id'],
      status : status,
    }
    this.video.saveVideo(obj).subscribe(res => {
      console.log(res);
    },err => {
      console.log(err);
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
    })

  }

  status = [
    'Not Completed',
    'Verified',
    'Live',
    'Disabled',
    'Deleted',
  ]


}
