import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {

  constructor() { }

  

  
  languages: any;
  id: any;
  
  tempLang = {
    'HI' : 'HINDI',
    'EN' : 'ENGLISH',
    'MH' : 'MARATHI',
  };

  ngOnInit(): void {

    this.id = JSON.parse(localStorage.getItem('video-list'));
    const tabs = [];

    for (const id of this.id.data){
      console.log(id);
      tabs.push({
        title : this.tempLang[id.language],
        route : [`id/${id.video}`],
      });
    }
    this.tabs = tabs;
  }

  tabs: any[] ;

  deleteVideo(){
    
  }


}
