import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private course: CourseService,
             ) { }

  languages: any;
  id:any;
  x = "asd";

  tempLang = {
    'HI' : "HINDI",
    'EN' : "ENGLISH",
    'MH' : "MARATHI"
  };
  ngOnInit(): void {

    this.id = JSON.parse(localStorage.getItem('course-list'));
    let tabs = [];
    
    for (const id of this.id.data){
      console.log(id)
      tabs.push({
        title : this.tempLang[id.lang],
        route : [`id/${id.id}`],
      });
    }
    this.tabs = tabs;
  }

  tabs: any[] ;

}
