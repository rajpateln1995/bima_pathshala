import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss'],
})
export class AllCoursesComponent implements OnInit {

  constructor() { }


  table_head = [
    'Course Name',
    'Type',
    'Course Fee',
    'Duration',
    'Rating',
    'View / Edit',
  ];
  total: number = 0;

  ngOnInit(): void {
  }

}
