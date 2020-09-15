import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseManagerService } from '../../../services/expense-manager.service';

@Component({
  selector: 'ngx-all-expense',
  templateUrl: './all-expense.component.html',
  styleUrls: ['./all-expense.component.scss']
})
export class AllExpenseComponent implements OnInit {

  constructor(private expenses: ExpenseManagerService,
              private router: Router) { }

  ngOnInit(): void {
    this.getExpenses();
  }
  
  Data: any;
  total = 0;
  table_head = [
    'Name',
    'Date',
    'Amount',
    'Status',
    'Bill Image',
    'View / Edit',
  ];
  status = [
    '',
    'Pending',
    'Approved',
    'Sent Back',
  ];


  getExpenses(){
    
    this.expenses.getAllExpense().subscribe((res: any) => {
      console.log(res);
      this.Data = res.data;
      this.total = this.Data.length;
    },
    err =>{
      console.log(err);
    });
  }

  viewSession(id,status){
    console.log(this.Data.status);
    this.router.navigateByUrl(`/pages/expense-manager/edit/${id}/${status}`);
  }

}
