import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllExpenseComponent } from './all-expense/all-expense.component';
import { EditExpensesComponent } from './edit-expenses/edit-expenses.component';
import { ExpenseManagerComponent } from './expense-manager.component';


const routes: Routes = [
  {
    path: '',
    component: ExpenseManagerComponent,
    children: [
      {
          path: '',
          redirectTo: 'all-expenses',
          pathMatch: 'full',
      },
      {
        path: 'all-expenses',
        component: AllExpenseComponent,
      },
      {
        path: 'edit/:id/:status',
        component: EditExpensesComponent,
      },
      
    ],
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseManagerRoutingModule { }
