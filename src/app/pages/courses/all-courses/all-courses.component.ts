import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss'],
})
export class AllCoursesComponent implements OnInit {

  constructor(private courses: CourseService,
              private router: Router) { }


  table_head = [
    'Course Name',
    'Type',
    'Course Fee',
    'Status',
    'Duration',
    'Rating',
    'View / Edit',
  ];
  total: number = 0;
  data: any ;
  courseType: string;
  languages = [];
  x;
  courseTitle = '';
  fee = 0;

  ngOnInit(): void {
    this.courses.getCourses().subscribe(res => {
      console.log(res);
      this.data = res;
      this.data = this.data.data;
      this.total = this.data.length;
    },
    err => {
      console.log(err);
    });



  }

  viewCourse(courseId) {
    this.router.navigateByUrl('pages/courses/create/id/'+courseId);
  }

  createModal() {
    if (this.languages.length > 0){
      document.getElementById('create-modal').click();
    } else{
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
        document.getElementById('create-modal').click();
      },
      err => {
        console.log(err);
      });
    }

  }

  finance;
  accounting;
  protection;
  submit(){
    let languages = '';
    for (const lang of this.languages){
      if (lang.value){
        languages = languages + lang.name + ',';
      }
    }
    const category = [];
    if (this.finance){
      category.push('Finance');
    }
    if (this.accounting){
      category.push('Accounting');
    }
    if (this.protection){
      category.push('Protection');
    }
    const obj = {
      'title' : this.courseTitle,
      'fee' : this.fee,
      'type' : this.courseType,
      'languages' : languages.slice(0, (languages.length - 1)),
      'category' : category,
    };
    console.log(obj);
    this.courses.createCourse(obj).subscribe(res => {
      console.log(res);
      let data: any = res;
      data = data.data;
      const id = [];
      for (const d of data){
        id.push({
          'id' : d._id,
          'lang' : d.language,
        });
      }
      localStorage.setItem('course-list', JSON.stringify({ 'data' : id }));
      document.getElementById('close-btn').click();
      this.router.navigateByUrl(`pages/courses/create/id/${id[0].id}`);

    },
    err => {
      console.log(err);
    });
  }



}
