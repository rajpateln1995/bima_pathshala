import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { SessionsService } from '../../../services/sessions.service';

@Component({
  selector: 'ngx-all-sessions',
  templateUrl: './all-sessions.component.html',
  styleUrls: ['./all-sessions.component.scss']
})
export class AllSessionsComponent implements OnInit {

  constructor(private session: SessionsService,
              private courses: CourseService,
              private router: Router) { }

  ngOnInit(): void {
    this.getSessions();
  }

  Data;
  total;
  table_head = [
    'Name',
    'Duration',
    'Date',
    'Language',
    'Cover Image',
    'Cover Video',
    'View / Edit',
  ];
  fee = 0;
  finance;
  accounting;
  protection;
  languages = [];
  sessionType;

  getSessions(){
    this.session.getAllSessions().subscribe(res => {
      console.log(res);
      let temp: any = res;
      this.total = temp.total;
      temp = temp.data;
      this.Data = temp;
      
    },
    err => {
      console.log(err);
    });
  }

  createSession() {
    if (this.languages.length > 0) {
      document.getElementById('create-session').click();
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
        document.getElementById('create-session').click();
      },
      err => {
        console.log(err);
      });
    }
  }


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
      'fee' : this.fee,
      'type' : this.sessionType,
      'languages' : languages.slice(0, (languages.length - 1)),
      'category' : category,
    };
    console.log(obj);
    this.session.createSession(obj).subscribe(res => {
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
      console.log(id);
      console.log(obj);
      localStorage.setItem('session-list', JSON.stringify({ 'data' : id }));
      document.getElementById('close-btn').click();
      this.router.navigateByUrl(`pages/sessions/create/id/${id[0].id}`);

    },
    err => {
      console.log(err);
    });
  }

  viewSession(sesionId){
    
      console.log(sesionId)
      let obj;
      this.courses.getCourseDetails(sesionId).subscribe(res => {
        console.log(res);
        const temp: any = res;
        obj = temp.data.course.otherLanguages;
        const data = [];
        for (const x of obj){
          data.push({
            id : x.course,
            lang : x.language});
        }
        localStorage.setItem('session-list', JSON.stringify({data : data}));
        this.router.navigateByUrl('pages/sessions/create/id/' + sesionId);
      },
      err => {
        console.log(err);
      });

  }

}
