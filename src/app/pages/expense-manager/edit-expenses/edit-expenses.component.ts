import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseManagerService } from '../../../services/expense-manager.service';

@Component({
  selector: 'ngx-edit-expenses',
  templateUrl: './edit-expenses.component.html',
  styleUrls: ['./edit-expenses.component.scss']
})
export class EditExpensesComponent implements OnInit {

  constructor(private expenses : ExpenseManagerService,
              private route : ActivatedRoute) { }

  status;

  ngOnInit(): void {
    this.status = this.route.snapshot.params['status'];
  }

  changeStatus(){
    const obj ={
      _id : this.route.snapshot.params['id'],
      status: this.status,
    }
    this.expenses.updateExpense(obj).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    })
  }

}
