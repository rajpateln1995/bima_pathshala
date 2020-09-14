import { Component, OnInit } from '@angular/core';
import { ExpenseManagerService } from '../../../services/expense-manager.service';

@Component({
  selector: 'ngx-all-expense',
  templateUrl: './all-expense.component.html',
  styleUrls: ['./all-expense.component.scss']
})
export class AllExpenseComponent implements OnInit {

  constructor(private expenses: ExpenseManagerService) { }

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


  getExpenses(){
    this.expenses.getAllExpense().subscribe((res: any) => {
      console.log(res);
      this.Data = res.data;
      this.total = this.Data.total;
    },
    err =>{
      console.log(err);
    });
  }

  viewSession(id){
    
  }

}
