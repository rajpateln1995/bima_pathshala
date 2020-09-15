import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';


@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  constructor(private course: CourseService,
             private route: ActivatedRoute,
             private toaster : NbToastrService) { }

  languages: any;
  id: any;
  x = 'asd';
  s;

  tempLang = {
    'HI' : 'HINDI',
    'EN' : 'ENGLISH',
    'MH' : 'MARATHI',
  };
  ngOnInit(): void {
    this.s = window.location.href.slice(-1);

    this.id = JSON.parse(localStorage.getItem('course-list'));
    const tabs = [];

    for (const id of this.id.data){
      console.log(id);
      tabs.push({
        title : this.tempLang[id.lang],
        route : [`id/${id.id}`],
      });
    }
    this.tabs = tabs;
  }

  tabs: any[] ;


  markComplete(){
    



  }
  changeStatus(status, type: NbComponentStatus) {
    this.s = status;
    this.toaster.show(`Course Is ${this.status[this.s]}`, this.status[this.s] , { status : type });
    for (const data of this.id.data){
      const obj = {
        _id : data.id,
        status : status,
      };
    this.course.putCourse(obj).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });

  }
}

live(){
    let validate = this.check();
    console.log(validate);
    if (validate){
      for (const data of this.id.data){
        const obj = {
          _id : data.id,
          status : true,
        };
        this.course.putCourse(obj).subscribe(res => {
          console.log(res);
        }, err => {
          console.log(err);
        });
      }
      alert("Course Validated ! Your Course is live Now")
    }else{
      alert("Course invalid ! Make sure your course has atleast one section and subsection.")
    }
}
check(){
  let validate = false;
  let len = this.id.data.length - 1;
    for (const data of this.id.data){
      this.course.getCourseDetails(data.id).subscribe(res => {
        console.log(res);
        const temp: any = res;
        if (temp.data.course && temp.data.course.sections.length > 0){
          if(temp.data.course.sections.data && temp.data.course.sections.data.length > 0){
            if (temp.data.course.sections[0].assessment && temp.data.course.sections[0].assessment !== null){
              validate = true;
            } else {
              return false;
            }
          }
        }else {
          return false;
        }
      }, err => {
        console.log(err);
      });
      len--;
      if(len === 0){
        if (validate){
          return true;
        }
      }
    }
  }

  status = [
    'Not Verified',
    'Verified',
    'Live',
    'Disabled',
    'Deleted',
  ]



}
