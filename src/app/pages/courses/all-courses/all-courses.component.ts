import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'ngx-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss'],
})
export class AllCoursesComponent implements OnInit {

  constructor(private courses : CourseService) { }


  table_head = [
    'Course Name',
    'Type',
    'Course Fee',
    'Status',
    'Duration',
    'Rating',
    'View / Edit',
  ];
  total: number = 0;
  data : any ;
  courseType: string;

  ngOnInit(): void {
    this.courses.getCourses().subscribe(res => {
      console.log(res)
      this.data = res;
      this.data = this.data.data;
      this.total = this.data.length;
    })
  }

  viewCourse(courseId){
    console.log(courseId)
  }

}
