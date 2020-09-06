import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'ngx-create-course-section-route',
  templateUrl: './create-course-section-route.component.html',
  styleUrls: ['./create-course-section-route.component.scss']
})
export class CreateCourseSectionRouteComponent implements OnInit {

  constructor(private courses : CourseService) { }
  @Input() section: any;
  @Input() language: any;
  @Output() courseEvent = new EventEmitter();
  sub;

  ngOnInit(): void {
    console.log(this.section)
    this.sub = this.section.data;
    console.log(this.sub);
  }


  mediaType;
  subSectionTittle;
  createSubSection(subSectionModal){
    console.log(this.section._id)
    const obj = {
      _id : this.section._id,
      data : [
        {
            tittle: this.subSectionTittle,
            type : this.mediaType,
            url : this.mediaUrl,
        },
    ]};
    console.log(obj)
    this.courses.createSubSection(obj).subscribe(res => {
      console.log(res);
      this.courseEvent.next();
      document.getElementById('close-sub-section').click();
      subSectionModal.resetForm();
    },
    err => {
      console.log(err);
    })
     

  }



  progress;
  mediaUrl;
  uploadMedia(event) {
    const data = event.target.files[0];
    this.courses.upload(data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        console.log(event);
        this.progress = (event.loaded / event.total) * 100;
      }else if (event.type === HttpEventType.Response){
        console.log(event);
        const data:any = event;
        this.mediaUrl = data.body.data[0];
        this.progress = 0;
      }
    },
    err => {
      console.log(err);
    });
  }

}
