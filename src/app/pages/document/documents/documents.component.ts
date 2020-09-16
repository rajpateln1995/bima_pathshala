import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {

  constructor(private document: DocumentService,
              private courses: CourseService,
              private router: Router,
              private toaster: NbToastrService) { }
  Data: any;
  total: number = 0;
  languages = [];
  table_head = [
    'Title',
    'Type',
    'Language',
    'Reading Time',
    'Status',
    'Image',
    'View / Edit',
  ];

  status = [
    'Not Completed',
    'Verified',
    'Live',
    'Disabled',
    'Deleted',
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
        this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
      });
    }

  }

  getDocuments(){
    this.document.getDocAndArticle('', '', '1' , '10000' , 'true').subscribe(res => {
      console.log(res);
      const temp: any = res;
      this.Data = temp.data;
      this.total = this.Data.length;
      console.log(this.Data);
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
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
  showErr = false;
  submit(){

    const tags = [];
    if (this.finance) {
      tags.push('Finance');
    }
    if (this.insurance) {
      tags.push('Insurance');
    }
    if (this.protection) {
      tags.push('Protection');
    }

    let languages = '';
    for (const lang of this.languages){
      if (lang.value){
        languages = languages + lang.name + ',';
      }
    }

    if (languages === ''){
      this.showErr = true;
    }else {
      this.showErr = false;
      const obj = {
        type : this.docType,
        languages : languages.slice(0, (languages.length - 1)),
        tags : tags,
      };
      this.document.addMultipleDoc(obj).subscribe(res => {
        console.log(res);
        const temp: any = res;
        localStorage.setItem('doc-list', JSON.stringify({'data' : temp.data[0].otherLanguages}));
        console.log(temp.data[0].otherLanguages[0].document);
        this.router.navigateByUrl(`pages/document/edit/id/${temp.data[0].otherLanguages[0].document}/0`);
        document.getElementById('close-btn').click();
        this.toaster.show('Documents Created Successfully !', 'Documents Created' , { status : 'success' });
      },
      err => {
        console.log(err);
        document.getElementById('close-btn').click();
        this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
      });
    }

  }

  viewDocument(id, status){
      this.document.getDocAndArticle('' , id).subscribe(res => {
        console.log(res);
        const temp: any = res;
        const obj = temp.data[0].otherLanguages;
        localStorage.setItem('doc-list' , JSON.stringify({ data : obj }));
        this.router.navigateByUrl(`pages/document/edit/id/${id}/${status}`);
      },
      err => {
        console.log(err);
        this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
      });
  }


}
