import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ExpenseManagerService } from '../../../services/expense-manager.service';

@Component({
  selector: 'ngx-all-expense',
  templateUrl: './all-expense.component.html',
  styleUrls: ['./all-expense.component.scss']
})
export class AllExpenseComponent implements OnInit {

  constructor(private expenses: ExpenseManagerService,
              private router: Router,
              private toaster : NbToastrService) { }

  ngOnInit(): void {
    this.getExpenses();
  }
  
  Data: any;
  total = 0;
  limit = '50';
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
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
    });
  }

  changeLimit(limit){
    this.limit = limit;
    this.getExpenses();
  }

  viewSession(id,status){
    console.log(this.Data.status);
    this.router.navigateByUrl(`/pages/expense-manager/edit/${id}/${status}`);
  }

}
