import { HttpEventType } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
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
  editSubSecId;
  subSecTarget;
  editSubSecIdTarget;
  deleteId;
  deleteTarget;

  constructor(private courses : CourseService,
              private route : ActivatedRoute,
              private toaster : NbToastrService) { }

  ngOnInit(): void {
    console.log(this.curriculum);
    this.subSecId = `subSec${this.curriculum._id}`;
    this.subSecTarget = `#subSec${this.curriculum._id}`;
    this.deleteId =  `deleteConfirmModal${this.curriculum._id}`;
    this.deleteTarget = `#deleteConfirmModal${this.curriculum._id}`;
    this.editSubSecId = `editSubSecId${this.curriculum._id}`;
    this.editSubSecIdTarget = `#editSubSecId${this.curriculum._id}`;
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

  editSubSectionTitle;
  editMediaType;
  subsecindex;
  editSubSec(type , title , i){
    this.editSubSectionTitle = title;
    this.editMediaType = type;
    this.subsecindex = i;
  }



  SaveSubSection(editForm){
    console.log(this.subsecindex);
    this.curriculum.data[this.subsecindex].type = this.editMediaType;
    this.curriculum.data[this.subsecindex].title = this.editSubSectionTitle;
    if(this.mediaUrl !== ''){
      this.curriculum.data[this.subsecindex].url = this.mediaUrl;
    }
    if (this.thumb !== ''){
      this.curriculum.data[this.subsecindex].thumb = this.thumb;
    }
    
    const obj = {
      _id: this.curriculum._id,
      data : this.curriculum.data,
    }

    this.courses.createSubSection(obj).subscribe((res: any) => {
      this.curriculum.data = res.data.data;
      document.getElementById('close-edit-sub-section'+this.curriculum._id).click();
      editForm.resetForm();
      this.thumb = '';
      this.mediaUrl = '';
    },err => {
      console.log(err);
      this.thumb = '';
      this.mediaUrl = '';
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
    })

    // this.sortSubsection();

    // const obj = {
    //   _id : this.section._id,
    //   data : this.sub,
    // };

    // this.courses.createSubSection(obj).subscribe(res => {
    //   const str = `close-sub-section${this.section_id}`;
    //   document.getElementById(str).click();
    //   form.resetForm();
    //   this.progress = 0;
    //   this.toaster.show('Sub Section Saved Successfully!', 'Sub Section Saved' , { status : 'success' });
    //   this.thumb = '';
    // },
    // err => {
    //   console.log(err);
    //   this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
    //   this.thumb = '';

    // });
  }



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
        this.toaster.show('Media Uploaded Successfully', 'Media Uploaded' , { status : 'success' });
      }
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
    });
  }


  thumb = '';
  progressThumb = 0;
  uploadThumb(event){
    const data = event.target.files[0];
    this.courses.upload(data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        this.progressThumb = (event.loaded / event.total) * 100;
      }else if (event.type === HttpEventType.Response){
        console.log(event);
        const data: any = event;
        this.thumb = data.body.data[0];
        this.disableBtn = false;
        this.toaster.show('Media Uploaded Successfully', 'Media Uploaded' , { status : 'success' });
      }
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
    });
  }


  saveSection(){

    this.courses.createSubSection(this.curriculum).subscribe(res => {
      console.log(res);
      this.toaster.show('Session Saved Successfully', 'Session Saved' , { status : 'success' });
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
    });
  }


  createSubSection(subSecModal){
    this.curriculum.data.push({
      title: this.subSectionTitle,
      type : this.mediaType,
      url : this.mediaUrl,
      thumb : this.thumb,
    });

    this.courses.createSubSection(this.curriculum).subscribe(res => {
      console.log(res);
      const str = `close-sub-section${this.curriculum._id}`;
      document.getElementById(str).click();
      subSecModal.resetForm();
      this.progress = 0;
      this.disableBtn = true;
      this.thumb = '';
      this.mediaUrl = '';
      this.toaster.show('Sub Section Created Successfully', 'Sub Section Created' , { status : 'success' });
    },
    err => {
      console.log(err);
      this.thumb = '';
      this.mediaUrl = '';
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
    });
  }

  deleteSubSection(subSecId) {
    this.courses.delSubSection(subSecId , this.curriculum._id).subscribe(res => {
      console.log(res);
      const temp: any = res;
      this.curriculum.data = temp.data.data;
      this.toaster.show('Sub Section Deleted Successfully', 'Sub Section Deleted' , { status : 'success' });
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
    });
  }


  deleteSection(){
    document.getElementById('close-delete').click();
    console.log(this.route.snapshot.params['id'])
    this.courses.delSection('', this.curriculum._id, this.route.snapshot.params['id']).subscribe(res => {
      console.log(res);
      this.courseEvent.next();
      this.toaster.show('Section Deleted Successfully', 'Session Deleted' , { status : 'success' });
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong', 'Error' , { status : 'danger' });
    });
  }



}
