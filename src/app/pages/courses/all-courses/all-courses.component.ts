import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss'],
})
export class AllCoursesComponent implements OnInit {

  constructor(private courses: CourseService,
              private router: Router,
              private toaster: NbToastrService) { }


  table_head = [
    'Course Name',
    'Type',
    'Course Fee',
    'Language',
    'Status',
    'Duration',
    'Rating',
    'View / Edit',
  ];

  status = [
    'Not Completed',
    'Verified',
    'Live',
    'Disabled',
    'Deleted',
  ];
  filterSelect = 'EN';
  total: number = 0;
  data: any ;
  courseType: string;
  languages = [];
  x;
  courseTitle = '';
  fee = 0;
  limit: string = '50';
  curr_page: string = '1';
 

  ngOnInit(): void {
    this.courses.getCourses('', '1' , this.limit, 'true', this.filterSelect).subscribe(res => {
      this.data = res;
      this.total = this.data.total;
      this.data = this.data.data;
      console.log(this.data);
    },
    err => {
      console.log(err);
    });
    this.getLanguages();
  }

  lang = {};
  getLanguages(){
    this.courses.getLanguages().subscribe((res: any) => {
      for (const l of res.data){
        this.lang[l.name] = l.displayName;
      }
    })
  }

  getPage(page){
    this.courses.getCourses('0', page , this.limit , 'true' , this.filterSelect).subscribe(res => {
      console.log(res);
      this.data = res;
      this.total = this.data.total;
      this.data = this.data.data;
      this.curr_page = page;
    },
    err => {
      console.log(err);
    });
  }

  viewCourse(courseId, status) {
    console.log(courseId);
    let obj;
    this.courses.getCourseDetails(courseId).subscribe(res => {
      console.log(res);
      const temp: any = res;
      obj = temp.data.course.otherLanguages;
      const data = [];
      for (const x of obj){
        data.push({
          id : x.course,
          lang : x.language});
      }
      localStorage.setItem('course-list', JSON.stringify({data : data}));
      this.router.navigateByUrl('pages/courses/create/id/' + courseId + '/' + status);
    },
    err => {
      console.log(err);
    });

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
            'value' : true,
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
  certificate;
  submit() {
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
      'fee' : this.fee,
      'type' : this.courseType,
      'languages' : languages.slice(0, (languages.length - 1)),
      'category' : category,
      'certificateThreshold' : this.certificate,
    };
    this.toaster.show('Courses Created Successfully !', 'Courses Created' , { status : 'success' });
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
      this.router.navigateByUrl(`pages/courses/create/id/${id[0].id}/0`);

    },
    err => {
      console.log(err);
    });
  }

  changeLimit(e){
    this.limit = e;
    this.courses.getCourses('', '1' , this.limit, 'true' , this.filterSelect).subscribe(res => {
      console.log(res);
      this.data = res;
      this.total = this.data.total;
      this.data = this.data.data;
    },
    err => {
      console.log(err);
    });
  }


  changeFilter(){
    this.courses.getCourses('', '1' , this.limit, 'true' , this.filterSelect).subscribe(res => {
      console.log(res);
      this.data = res;
      this.total = this.data.total;
      this.data = this.data.data;
    },
    err => {
      console.log(err);
    });
  }

}
