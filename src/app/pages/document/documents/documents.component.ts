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
  limit = '50';
  curr_page = 1;
  pageSize;
  filterSelect = 'EN';
  table_head = [
    'Title',
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
    this.getDocuments('1');
    this.getLang();
  }

  lang = {};
  getLang(){
    this.courses.getLanguages().subscribe((res: any) => {
      for (const l of res.data){
        this.lang[l.name] = l.displayName;
      }
    })
  }

  getPage(page) {
    this.getDocuments(page);
    this.curr_page = page;
  }

  changeFilter(){
    this.getDocuments('1');
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
            'value' : true,
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

  changeLimit(limit){
    this.limit = limit;
    this.getDocuments('1');
  }

  getDocuments(page){
    this.document.getDocAndArticle('', '', page , this.limit , 'true' , this.filterSelect).subscribe(res => {
      console.log(res);
      const temp: any = res;
      this.Data = temp.data;
      this.total = temp.total;
      console.log(this.total);
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
    });
  }


  docType = 'article';
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
      this.document.getDocAndArticle('' , id, '1', '10', 'true' , this.filterSelect).subscribe(res => {
        console.log(res);
        const temp: any = res;
        console.log(id);
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
