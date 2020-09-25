import { Component, OnInit, ɵConsole } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';


@Component({
  selector: 'ngx-create-course-route',
  templateUrl: './create-course-route.component.html',
  styleUrls: ['./create-course-route.component.scss'],
})
export class CreateCourseRouteComponent implements OnInit {

  constructor(private courses: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: NbToastrService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  id;
  details: any;
  SectionName;
  SectionDescription;

  disable: boolean = true;
  s;

  ngOnInit(): void {

    this.getCourse();
    this.s = window.location.href.slice(-1);

  }


  changeStatus(status, type: NbComponentStatus) {
    this.s = status;
    const obj = {
      _id: this.route.snapshot.params['id'],
      status: status,
    };
    this.courses.putCourse(obj).subscribe(res => {
      console.log(res);
      this.toaster.show(`Course Is ${this.status[this.s]}`, this.status[this.s], { status: type });
    }, err => {
      console.log(err);
    });
  }


  checkIndexing(sum, length) {
    if(sum === 0){
      return false;
    }
    if (sum === length * (length + 1) / 2) {
      return true;
    } else {
      return false;
    }
  }



  validateCourse(): any {
    const temp: any = this.details;
    this.id = this.route.snapshot.params['id'];
    this.courses.getCourseDetails(this.id).subscribe(res => {
      console.log(res);
      const data: any = res;
      this.details = data.data.course;
      this.s = data.data.course.status;
      if (temp && temp.sections) {
        if (temp.sections && temp.sections.length > 0) {
          let sectionIndexSum = 0;
          for (const sec of temp.sections) {
            sectionIndexSum = sectionIndexSum + Number(sec.index);
            if (sec.data && sec.data.length > 0) {
              let subsecindexSum = 0;
              for (const data of sec.data) {
                subsecindexSum = subsecindexSum + Number(data.index);
              }
              if (this.checkIndexing(subsecindexSum, sec.data.length)) {
                // pass
                
              } else {
                this.toaster.show(`Please Correct the Index of Sub-Sections in "${sec.name}" Section`,
                'Cannot Validate Course', { status: 'warning', duration: 7000 });
                return;
              }
            } else {
              this.toaster.show(`Add Atleast 1 Sub Section To "${sec.name}" Section`,
              'Cannot Validate Course', { status: 'warning', duration: 7000 });
              return;
            }
          }
          if(this.checkIndexing(sectionIndexSum , temp.sections.length)){
            // pass
          }else{
            this.toaster.show(`Please Correct the Index of Sections`,
                'Cannot Validate Course', { status: 'warning', duration: 7000 });
                return;
          }
        } else {
          this.toaster.show(`Please Add Atleast 1 Section`,
                'Cannot Validate Course', { status: 'warning', duration: 7000 });
                return;
        }
      } else {
        this.toaster.show(`Please Add Atleast 1 Section`,
                'Cannot Validate Course', { status: 'warning', duration: 7000 });
        return;
      }


      //Success updating status
      this.s = 1;
      const obj = {
        _id: this.route.snapshot.params['id'],
        status: 1,
      };
      this.courses.putCourse(obj).subscribe(res => {
        console.log(res);
        this.toaster.show('Course Validated Successfully !', 'Course Validated', { status: 'success' });
      }, err => {
        console.log(err);
        this.toaster.show('Something Went Wrong !', 'Error', { status: 'danger' });
      });
      //Success updating status ends
    },
    err => {
      console.log(err);
      return;
    });

    
    
  }

  getCourse() {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.courses.getCourseDetails(this.id).subscribe(res => {
      console.log(res);
      const data: any = res;
      this.details = data.data.course;
      this.s = data.data.course.status;
    },
      err => {
        console.log(err);
        this.toaster.show('Something Went Wrong !', 'Error', { status: 'danger' });
      });
  }

  createSection(form) {
    console.log(this.route.snapshot.params['id']);
    const obj = {
      'name': this.SectionName,
      'description': this.SectionDescription,
      'course': this.route.snapshot.params['id'],
    };
    console.log(obj);
    this.courses.createSection(obj).subscribe(res => {
      console.log(res);
      this.toaster.show('Section Created Successfully !', 'Section Created', { status: 'success' });
      document.getElementById('close-section').click();
      form.resetForm();
      this.getCourse();
    }, err => {
      console.log(err);
      this.toaster.show('Something Went Wrong !', 'Error', { status: 'danger' });
      document.getElementById('close-section').click();
    });
  }

  coverimage;
  progressImg = 0;
  uploadImage(event) {
    const data = event.target.files[0];
    this.courses.upload(data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log(event);
        this.progressImg = (event.loaded / event.total) * 100;

      } else if (event.type === HttpEventType.Response) {
        console.log(event);
        const data: any = event;
        this.coverimage = data.body.data[0];
        this.toaster.show('Image Uploaded Successfully !', 'Image Uploaded', { status: 'success' });
      }
    },
      err => {
        console.log(err);
        this.progressImg = 0;
        this.toaster.show('Something Went Wrong !', 'Upload Failed', { status: 'danger' });
      });
  }
  covervideo;
  progressVideo = 0;
  uploadVideo(event) {
    const data = event.target.files[0];
    this.courses.upload(data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log(event);
        this.progressVideo = (event.loaded / event.total) * 100;

      } else if (event.type === HttpEventType.Response) {
        console.log(event);
        const data: any = event;
        this.covervideo = data.body.data[0];
        this.toaster.show('Video Uploaded Successfully !', 'Video Uploaded', { status: 'success' });
      }
    },
      err => {
        console.log(err);
        this.progressVideo = 0;
        this.toaster.show('Something Went Wrong !', 'Upload Failed', { status: 'danger' });
      });
  }

  saveCourse(ondestroy) {

    const obj = {
      name: this.details.name,
      description: this.details.description,
      coverImage: this.coverimage,
      coverVideo: this.covervideo,
      duration: this.details.duration,
      certificateThreshold: this.details.certificateThreshold,
      _id: this.route.snapshot.params['id'],
    };
    this.courses.putCourse(obj).subscribe(res => {
      console.log(res);
      this.getCourse();
      if (!ondestroy) {
        this.toaster.show('Course Details Saved Successfully !', 'Course Saved Successfully', { status: 'success' });
      }
    },
      err => {
        console.log(err);
        this.toaster.show('Something Went Wrong !', 'Error', { status: 'danger' });
      });
  }


  ngOnDestroy() {
    this.saveCourse(true);
  }


  status = [
    'Not Verified',
    'Verified / Marked as Complete',
    'Live',
    'Disabled',
    'Deleted',
  ];



}
