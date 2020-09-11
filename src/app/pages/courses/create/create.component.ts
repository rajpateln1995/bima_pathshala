import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  constructor(private course: CourseService,
             ) { }

  languages: any;
  id: any;
  x = 'asd';

  tempLang = {
    'HI' : 'HINDI',
    'EN' : 'ENGLISH',
    'MH' : 'MARATHI',
  };
  ngOnInit(): void {

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
    let validate = 1;
    for (const data of this.id.data){
      this.course.getCourseDetails(data.id).subscribe(res => {
        console.log(res);
        const temp: any = res;
        if (temp.data.course && temp.data.course.section.length > 0 && temp.data.course.section.data.length > 0){
          if (temp.data.course.section.assessment && temp.data.course.section.assessment !== null){
            validate *= 1;
          } else {
            validate *= 0;
          }
        }else {
          validate *= 0;
        }
      }, err => {
        console.log(err);
      });
    }
    console.log(validate);
    if (validate === 1){
      for (const data of this.id.data){
        const obj = {
          _id : data.id,
          status : true,
        }
        this.course.putCourse(obj).subscribe(res => {
          console.log(res);
        }, err =>{
          console.log(err);
        })
      }
    }
  }




}
