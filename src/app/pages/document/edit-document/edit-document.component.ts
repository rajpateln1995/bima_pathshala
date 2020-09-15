import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'ngx-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})
export class EditDocumentComponent implements OnInit {

  constructor(private course: CourseService,
              private document : DocumentService,
              private router : Router,
              private route: ActivatedRoute,
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

  changeStatus(status ,type : NbComponentStatus){
    this.s = status;
    this.toaster.show(`Document Is ${this.status[this.s]}`, this.status[this.s] , { status : type });
    const obj = {
      _id : this.route.firstChild.snapshot.params['id'],
      status : status,
    }
    this.document.saveDocument(obj).subscribe(res => {
      console.log(res);
    },err => {
      console.log(err);
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
