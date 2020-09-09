import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'ngx-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {

  constructor(private document: DocumentService) { }
  Data: any;
  total: number = 0;
  table_head = [
    'Title',
    'Language',
    'Reading Time',
    'Video',
    'Image',
    'View / Edit',
  ];

  ngOnInit() {
    this.getDocuments;

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

}
