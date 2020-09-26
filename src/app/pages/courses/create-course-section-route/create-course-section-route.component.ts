import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { DocumentService } from '../../../services/document.service';
import { TemperatureHumidityService } from '../../../@core/mock/temperature-humidity.service';

@Component({
  selector: 'ngx-create-course-section-route',
  templateUrl: './create-course-section-route.component.html',
  styleUrls: ['./create-course-section-route.component.scss'],
})
export class CreateCourseSectionRouteComponent implements OnInit {

  constructor(private courses: CourseService,
              private route: ActivatedRoute,
              private toaster: NbToastrService,
              private document: DocumentService,
              private router: Router) { }

  @Input() index: number;
  @Output() indexChange = new EventEmitter<number>();
  @Input() section: any = {};
  @Input() language: any;
  @Output() courseEvent = new EventEmitter();
  @Output() sortSections = new EventEmitter();

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
    this.SubSectionIndex = this.sub.length + 1;
    console.log(this.SubSectionIndex);
    console.log(this.section);
    console.log(this.language);
    this.assessment = this.section.assessment;
    this.section_id = this.section._id;
    this.subSecId = `subSec${this.section_id}`;
    this.subSecTarget = `#subSec${this.section_id}`;
    this.editSubSecId = `editSubSec${this.section_id}`;
    this.editSubSecTarget = `#editSubSec${this.section_id}`;
    this.deleteId =  `deleteConfirmModal${this.section_id}`;
    this.deleteTarget = `#deleteConfirmModal${this.section_id}`;
  }


  updateIndex(event){
    this.indexChange.emit(event);
  }

  SubSectionIndex;
  mediaType;
  subSectionTitle;
  disableBtn: boolean = true;
  createSubSection(subSectionModal) {

    if(this.mediaType === 'blog'){
      this.sub.push({
        title: this.subSectionTitle,
        type : this.mediaType,
        blogId : this.blogDetails.id,
        thumb : this.thumb,
        index : this.SubSectionIndex,
      });
    }else {
      this.sub.push({
        title: this.subSectionTitle,
        type : this.mediaType,
        url : this.mediaUrl,
        thumb : this.thumb,
        index : this.SubSectionIndex,
      });
    }

    this.sortSubsection();

    const obj = {
      _id : this.section._id,
      data : this.sub,
    };
    console.log(obj);

    this.disableBtn = true;
    this.courses.createSubSection(obj).subscribe((res: any) => {
      console.log(res);
      this.sub = res.data.data;
      const str = `close-sub-section${this.section_id}`;
      document.getElementById(str).click();
      subSectionModal.resetForm();
      this.progress = 0;
      this.thumb = '';
      this.blogDetails.id = '';
      this.blogDetails.name = '';
      this.mediaType = '';
      this.SubSectionIndex++;
      this.toaster.show('Sub Section Created Successfully !', 'Sub Section Created' , { status : 'success' });
    },
    err => {
      console.log(err);
      subSectionModal.resetForm();
      this.thumb = '';
      this.blogDetails.id = '';
      this.blogDetails.name = '';
      this.mediaType = '';
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'warning' });
    });

  }



  progress = 0;
  mediaUrl = '';
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
        this.progress = 0;
        this.toaster.show(' Media Uploaded Successfull !', 'Uploaded Successfully' , { status : 'success' });
      }
    },
    err => {
      console.log(err);
      this.progress = 0;
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
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
        this.progressThumb = 0;
        this.toaster.show(' Media Uploaded Successfull !', 'Uploaded Successfully' , { status : 'success' });
      }
    },
    err => {
      console.log(err);
      this.progressThumb = 0;
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
    });
  }

  saveSection(ondestroy){

    const obj = {
      _id : this.section._id,
      name : this.section_name,
      description : this.section_description,
      index : this.index,
    };
    this.courses.createSubSection(obj).subscribe(res => {
      console.log(res);
      this.sortSections.emit();
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
    this.sortSubsection();
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
  edit_blogUrl;
  edit_blogId;
  editSubSectionIndex;
  editSubSection(title , type , blog_id , blogURL , subIndex , i){
    this.editMediaType = type;
    this.editSubSectionTitle = title;
    this.subSecIndex = i;
    this.blogDetails.id = blog_id;
    this.editSubSectionIndex = subIndex;

    document.getElementById('toogle-edit-modal').click();
  }

  saveSubSectionChanges(form){
    this.sub[this.subSecIndex].type = this.editMediaType;
    this.sub[this.subSecIndex].title = this.editSubSectionTitle;
    this.sub[this.subSecIndex].index = this.editSubSectionIndex;
    if (this.editMediaType === 'blog'){
      this.sub[this.subSecIndex].blogId = this.blogDetails.id;
    };
    if(this.mediaUrl !== ''){
      this.sub[this.subSecIndex].url = this.mediaUrl;
    }
    if (this.thumb !== ''){
      this.sub[this.subSecIndex].thumb = this.thumb;
    }

    this.sortSubsection();

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
      this.thumb = '';
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
      this.thumb = '';

    });

  }


  articles = [];
  articleSearch = '';
  getArticles() {
    this.document.getDocAndArticle('', '', '1', '10000', 'false', this.language, this.articleSearch).subscribe((res: any) => {
      this.articles = res.data;
      console.log(res);
    },
    err => {
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
    });
  }

  getArticleHref(id , status){

    this.document.getDocAndArticle('',id, '1', '10').subscribe((res: any) => {
      const obj = res.data[0].otherLanguages;
      localStorage.setItem('doc-list' , JSON.stringify({ data : obj }));
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`/pages/document/edit/id/${id}/${status}`]),
      );
      window.open(url , '_blank');
      console.log(res);
    },
    err => {
      console.log(err);
    });
  }

  blogDetails = {
    id : '',
    name : ''
  };
  setBlogDetails(id , name){
    this.blogDetails.id = id;
    this.blogDetails.name = name;
    this.articles = [];
  }


  //Submit button validation
  isBlogSelected(){
    if(this.mediaType === 'blog'){
      if(this.blogDetails.id.length > 0){
        return true;
      }else{
        return false;
      }
    }else {
      return true;
    }
  }


  // sorting index wise
  sortSubsection(){
    this.sub = this.sub.sort((a , b) => {
      return a.index - b.index;
    });

  }

}
