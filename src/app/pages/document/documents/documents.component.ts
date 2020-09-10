import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'ngx-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {

  constructor(private document: DocumentService,
              private courses: CourseService) { }
  Data: any;
  total: number = 0;
  languages = [];
  table_head = [
    'Title',
    'Type',
    'Language',
    'Reading Time',
    'Video',
    'Image',
    'View / Edit',
  ];

  ngOnInit() {
    this.getDocuments();


  }

  getLanguages(){
    if (this.languages.length > 0){
      document.getElementById('create-doc-modal').click();
    } else {
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
        document.getElementById('create-doc-modal').click();
      },
      err => {
        console.log(err);
      });
    }

  }

  getDocuments(){
    this.document.getDocAndArticle('document').subscribe(res => {
      console.log(res);
      const temp: any = res;
      this.total = temp.total;
      this.Data = temp.data;
      console.log(this.Data);
    },
    err => {
      console.log(err);
    });
  }


  docType;
  docTitle;
  createDocument(){
    this.getLanguages();

  }


  finance;
  insurance;
  protection;
  submit(){
    let languages = '';
    for (const lang of this.languages){
      if (lang.value){
        languages = languages + lang.name + ',';
      }
    }
    const tags = [];
    if (this.finance){
      tags.push('Finance');
    }
    if (this.insurance){
      tags.push('Insurance');
    }
    if (this.protection){
      tags.push('Protection');
    }

    const obj = {
      title : this.docTitle,
      type : this.docType,
      languages : languages.slice(0, (languages.length - 1)),
      tags : tags,

    };
    this.document.addMultipleDoc(obj).subscribe(res => {
      console.log(res);
      document.getElementById('close-btn').click();
    },
    err => {
      console.log(err);
      document.getElementById('close-btn').click();
    });


  }



}
