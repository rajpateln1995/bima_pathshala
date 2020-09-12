import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'ngx-edit-document-route',
  templateUrl: './edit-document-route.component.html',
  styleUrls: ['./edit-document-route.component.scss'],
})
export class EditDocumentRouteComponent implements OnInit {

  constructor(private document: DocumentService,
              private route: ActivatedRoute,
              private courses: CourseService,
              private router : Router) {
   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
}

  document_description;
  document_name;
  Data;
  reading_time;
  documentImg;
  sections;

  ngOnInit(): void {
    this.getDocument();
  }

  getDocument(){
    this.document.getDocAndArticle('', this.route.snapshot.params['id']).subscribe(res => {
      console.log(res);
      const temp: any = res;
      this.Data = temp.data[0];
      this.document_name = this.Data.title;
      this.document_description = this.Data.description;
      this.reading_time = this.Data.readingTime;
      this.sections = this.Data.data;
    });
  }

  mediaUrl;
  disableBtn;
  progress;
  upload(event){

    const data = event.target.files[0];
    this.courses.upload(data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        console.log(event);
        this.progress = (event.loaded / event.total) * 100;
      }else if (event.type === HttpEventType.Response){
        console.log(event);
        const data: any = event;
        this.mediaUrl = data.body.data[0];
        this.disableBtn = false;
      }
    },
    err => {
      console.log(err);
    });
  }

  createSec(){
    const obj = {
      title: '',
      body: '',
    }
    this.sections.push(obj);
  }

  save(){
    const obj = {
      title : this.document_name,
      description : this.document_description,
      img : this.mediaUrl,
      data : this.sections,
      _id : this.Data._id,
    }

    this.document.saveDocument(obj).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    })

  }

  ngOnDestroy() {
    this.save();
  }

}
