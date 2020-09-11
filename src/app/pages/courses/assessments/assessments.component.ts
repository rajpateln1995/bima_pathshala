import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'ngx-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.scss'],
})
export class AssessmentsComponent implements OnInit {

  constructor(private course: CourseService) { }



  @Input() assessment: any;
  @Input() section_id: any;

  data: any;
  question = {
    options : [],
    question : '',
    answer : '',
  };
  disable: boolean = true;

  ngOnInit(): void {
    if(this.assessment && this.assessment !== null) {
      this.data = this.assessment;
    } else {
      this.createAssessment();
    }
    console.log(this.section_id);

  }

  trackByFn(index: any, item: any) {
    return index;
 }

  // getAllQuestions(){
  //   this.course.getAllAssessments().subscribe(res => {
  //     console.log(res);
  //     const temp = res;
      
  //   },
  //   err => {
  //     console.log(err);
  //   })
  // }

  createAssessment() {
    const obj = {
      time : 0,
      type : 'mcq',
      questions: [{
        question : '',
        options : [],
        answer : '',
      }],
      courseSection : this.section_id,
    }
    this.course.addAssessment(obj).subscribe(res => {
      console.log(res);
      const temp: any = res;
      this.data = temp.data;
    },
    err => {
      console.log(err);
    });

  }


  deleteOption(i , j) {
    this.data.questions[i].options.splice(j , 1);
  }

  addOption(i) {
    this.data.questions[i].options.push('');
  }

  addQuestion() {
    this.data.questions.push(this.question);
  }

  deleteQuestion(i){
    this.data.questions.splice(i, 1);
  }

  save() {
    console.log(this.data);
    const obj = {
      questions : this.data.questions,
      _id : this.data._id,
    }
    this.course.editAssesment(obj).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    })
  }

}
