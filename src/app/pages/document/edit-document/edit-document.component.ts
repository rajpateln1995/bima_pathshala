import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})
export class EditDocumentComponent implements OnInit {

  constructor(private course: CourseService,
              private router : Router) { }

  languages: any;
  id: any;
  

  tempLang = {
  'HI' : 'HINDI',
  'EN' : 'ENGLISH',
  'MH' : 'MARATHI',
  };
  ngOnInit(): void {

    this.id = JSON.parse(localStorage.getItem('doc-list'));
    const tabs = [];

    for (const id of this.id.data){
    console.log(id);
    tabs.push({
    title : this.tempLang[id.language],
    route : [`id/${id.document}`],
    });
    }
    this.tabs = tabs;
  }

  tabs: any[] ;


}
