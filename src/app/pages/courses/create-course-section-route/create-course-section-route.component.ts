import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-create-course-section-route',
  templateUrl: './create-course-section-route.component.html',
  styleUrls: ['./create-course-section-route.component.scss'],
})
export class CreateCourseSectionRouteComponent implements OnInit {

  constructor(private courses: CourseService,
              private route: ActivatedRoute,
              private toaster: NbToastrService) { }


  @Input() section: any;
  @Input() language: any;
  @Output() courseEvent = new EventEmitter();
  sub;
  assessment;
  section_id;
  section_name;
  section_description;
  section_disable = true;
  subSecId;
  subSecTarget;
  editSubSecId;
  editSubSecTarget;
  deleteTarget;
  deleteId;
  ngOnInit(): void {
    this.section_name = this.section.name;
    this.section_description = this.section.description;
    this.sub = this.section.data;
    console.log(this.sub);
    this.assessment = this.section.assessment;
    this.section_id = this.section._id;
    this.subSecId = `subSec${this.section_id}`;
    this.subSecTarget = `#subSec${this.section_id}`;
    this.editSubSecId = `editSubSec${this.section_id}`;
    this.editSubSecTarget = `#editSubSec${this.section_id}`;
    this.deleteId =  `deleteConfirmModal${this.section_id}`;
    this.deleteTarget = `#deleteConfirmModal${this.section_id}`;
  }




  mediaType;
  subSectionTitle;
  disableBtn: boolean = true;
  createSubSection(subSectionModal) {
    this.sub.push({
      title: this.subSectionTitle,
      type : this.mediaType,
      url : this.mediaUrl,
    });

    const obj = {
      _id : this.section._id,
      data : this.sub,
    };
    this.disableBtn = true;
    this.courses.createSubSection(obj).subscribe((res: any) => {
      console.log(res);
      this.sub = res.data.data;
      const str = `close-sub-section${this.section_id}`;
      document.getElementById(str).click();
      subSectionModal.resetForm();
      this.progress = 0;
      this.toaster.show('Sub Section Created Successfully !', 'Sub Section Created' , { status : 'success' });
    },
    err => {
      console.log(err);
      subSectionModal.resetForm();
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'warning' });
    });

  }



  progress;
  mediaUrl;
  uploadMedia(event) {
    const data = event.target.files[0];
    this.courses.upload(data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        this.progress = (event.loaded / event.total) * 100;
      }else if (event.type === HttpEventType.Response){
        console.log(event);
        const data: any = event;
        this.mediaUrl = data.body.data[0];
        this.disableBtn = false;
        this.toaster.show(' Media Uploaded Successfull !', 'Uploaded Successfully' , { status : 'success' });
      }
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
    });
  }

  saveSection(ondestroy){

    const obj = {
      _id : this.section._id,
      name : this.section_name,
      description : this.section_description,
    };
    this.courses.createSubSection(obj).subscribe(res => {
      console.log(res);
      if (!ondestroy){
        this.toaster.show('Section Saved Successfully !', 'Section Saved' , { status : 'success' });
      }
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
    });
  }

  deleteSubSection(subSecId) {
    console.log(this.section._id);
    this.courses.delSubSection(subSecId , this.section._id).subscribe(res => {
      console.log(res);
      const temp: any = res;
      this.sub = temp.data.data;
      this.toaster.show('Sub Section Deleted Successfully', 'Sub Section Deleted' , { status : 'success' });
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
    });
  }

  deleteSection(){
    document.getElementById('close-delete').click();
    this.courses.delSection(this.route.snapshot.params['id'], this.section._id).subscribe(res => {
      console.log(res);
      this.courseEvent.next();
      this.toaster.show('Section Deleted Successfully !', 'Section Deleted' , { status : 'danger' });
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
    });
  }

  ngOnDestroy(){
    this.saveSection(true);
  }

  editMediaType;
  editSubSectionTitle;
  subSecIndex;
  editSubSection(title , type , i){
    this.editMediaType = type;
    this.editSubSectionTitle = title;
    this.subSecIndex = i;
    document.getElementById('toogle-edit-modal').click();
  }

  saveSubSectionChanges(form){
    this.sub[this.subSecIndex].type = this.editMediaType;
    this.sub[this.subSecIndex].title = this.editSubSectionTitle;
    this.sub[this.subSecIndex].url = this.mediaUrl;

    const obj = {
      _id : this.section._id,
      data : this.sub,
    };

    this.courses.createSubSection(obj).subscribe(res => {
      const str = `close-sub-section${this.section_id}`;
      document.getElementById(str).click();
      form.resetForm();
      this.progress = 0;
      this.toaster.show('Sub Section Saved Successfully!', 'Sub Section Saved' , { status : 'success' });
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
    });

  }

}
