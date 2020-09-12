import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseManagerRoutingModule } from './expense-manager-routing.module';
import { ExpenseManagerComponent } from './expense-manager.component';
import { AllExpenseComponent } from './all-expense/all-expense.component';


@NgModule({
  declarations: [ExpenseManagerComponent, AllExpenseComponent],
  imports: [
    CommonModule,
    ExpenseManagerRoutingModule
  ]
})
export class ExpenseManagerModule { }
