import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
 trackbyq(index: any, item: any) {
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
      certificateThreshold : 0,
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
    const question = {
      options : [],
      question : '',
      answer : '',
    };
    this.data.questions.push(question);
  }

  deleteQuestion(i){
    this.data.questions.splice(i, 1);
  }

  save() {
    console.log(this.data);
    const obj = {
      time : this.data.time,
      certificateThreshold : this.data.certificateThreshold,
      questions : this.data.questions,
      _id : this.data._id,
    }
    this.course.editAssesment(obj).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.save();
  }


}
