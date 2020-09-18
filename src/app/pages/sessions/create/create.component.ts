import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { CourseService } from '../../../services/course.service';
import { SessionsService } from '../../../services/sessions.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private course: CourseService,
            private route: ActivatedRoute,
            private toaster : NbToastrService,
            private session : SessionsService) { }

  languages: any;
  id: any;
  x = 'asd';
  s;

  tempLang = {

  };

 
  ngOnInit(): void {
    const tabs = [];
    this.id = JSON.parse(localStorage.getItem('session-list'));
    this.course.getLanguages().subscribe((res:any) => {
      for (const l of res.data){
        this.tempLang[l.name] = l.displayName;
      }
      for (const id of this.id.data){
        console.log(id);
        tabs.push({
          title : this.tempLang[id.lang],
          route : [`id/${id.id}/${this.s}`],
        });
      }
      this.tabs = tabs;
    });

  this.s = window.location.href.slice(-1);

  }

  tabs: any[] ;

  
  changeStatus(status , type: NbComponentStatus){
    this.s = status;
    this.toaster.show(`Session Is ${this.status[this.s]}`, this.status[this.s] , { status : type });
    const obj = {
      _id : this.route.firstChild.snapshot.params['id'],
      status : status,
    }
    this.session.saveSession(obj).subscribe(res => {
      console.log(res);
    },err => {
      console.log(err);
    });

  }

  status = [
    'Not Verified',
    'Verified / Marked as Complete',
    'Live',
    'Disabled',
    'Deleted',
  ]

}
