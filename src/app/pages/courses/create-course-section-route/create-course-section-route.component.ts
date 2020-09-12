import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-create-course-section-route',
  templateUrl: './create-course-section-route.component.html',
  styleUrls: ['./create-course-section-route.component.scss'],
})
export class CreateCourseSectionRouteComponent implements OnInit {

  constructor(private courses: CourseService,
              private route: ActivatedRoute) { }
  @Input() section: any;
  @Input() language: any;
  @Output() courseEvent = new EventEmitter();
  sub;
  assessment;
  section_id;
  section_name;
  section_description;
  section_disable = true;
  ngOnInit(): void {
    this.section_name = this.section.name;
    this.section_description = this.section.description;
    console.log(this.section.name);
    this.sub = this.section.data;
    console.log(this.sub);
    this.assessment = this.section.assessment;
    this.section_id = this.section._id;
  }




  mediaType;
  subSectionTittle;
  disableBtn: boolean = true;
  createSubSection(subSectionModal){
    console.log(this.section._id);

    const obj = {
      _id : this.section._id,
      data : [
        {
            tittle: this.subSectionTittle,
            type : this.mediaType,
            url : this.mediaUrl,
        },
    ]};

    this.courses.createSubSection(obj).subscribe(res => {
      console.log(res);
      this.courseEvent.next();
      document.getElementById('close-sub-section').click();
      subSectionModal.resetForm();
      this.progress = 0;
    },
    err => {
      console.log(err);
    });

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

    const obj = {
      _id : this.section._id,
      name : this.section_name,
      description : this.section_description,
    };
    this.courses.createSubSection(obj).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    });
  }

  deleteSubSection(subSecId) {
    console.log(this.section._id);
    this.courses.delSubSection(subSecId , this.section._id).subscribe(res => {
      console.log(res);
      const temp: any = res;
      this.sub = temp.data.data;
    },
    err => {
      console.log(err);
    });
  }

  deleteSection(){
    this.courses.delSection(this.route.snapshot.params['id'], this.section._id).subscribe(res => {
      console.log(res);
      this.courseEvent.next();
    },
    err => {
      console.log(err);
    });
  }

  ngOnDestroy(){
    this.saveSection();
  }

}
