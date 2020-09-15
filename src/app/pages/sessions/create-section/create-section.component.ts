import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'ngx-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {

  @Input() curriculum ;
  @Output() courseEvent = new EventEmitter();
  
  section_disable = true;
  subSectionTitle;
  mediaType;

  subSecId;
  subSecTarget;
  deleteId;
  deleteTarget;

  constructor(private courses : CourseService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.curriculum);
    this.subSecId = `subSec${this.curriculum._id}`;
    this.subSecTarget = `#subSec${this.curriculum._id}`;
    this.deleteId =  `deleteConfirmModal${this.curriculum._id}`;
    this.deleteTarget = `#deleteConfirmModal${this.curriculum._id}`;
  }


  // getSection(){
  //   this.courses.getSectionDetails(this.id).subscribe((res : any) => {
  //     console.log(res);
  //     this.section = res.data;
  //   },
  //   err => {
  //     console.log(err);
  //   })
  // }

  progress;
  mediaUrl;
  disableBtn: boolean = true;
  uploadMedia(event) {
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


  saveSection(){

    this.courses.createSubSection(this.curriculum).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    });
  }


  createSubSection(subSecModal){
    this.curriculum.data.push({
      title: this.subSectionTitle,
      type : this.mediaType,
      url : this.mediaUrl,
    });

    this.courses.createSubSection(this.curriculum).subscribe(res => {
      console.log(res);
      const str = `close-sub-section${this.curriculum._id}`;
      document.getElementById(str).click();
      subSecModal.resetForm();
      this.progress = 0;
    },
    err => {
      console.log(err);
    });
  }

  deleteSubSection(subSecId) {
    this.courses.delSubSection(subSecId , this.curriculum._id).subscribe(res => {
      console.log(res);
      const temp: any = res;
      this.curriculum.data = temp.data.data;
      
    },
    err => {
      console.log(err);
    });
  }


  deleteSection(){
    document.getElementById('close-delete').click();
    console.log(this.route.snapshot.params['id'])
    this.courses.delSection('', this.curriculum._id, this.route.snapshot.params['id']).subscribe(res => {
      console.log(res);
      this.courseEvent.next();
    },
    err => {
      console.log(err);
    });
  }



}
