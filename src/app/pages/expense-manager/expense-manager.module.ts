import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseManagerRoutingModule } from './expense-manager-routing.module';
import { ExpenseManagerComponent } from './expense-manager.component';
import { AllExpenseComponent } from './all-expense/all-expense.component';
import { FormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule, NbButtonModule, NbInputModule, NbCheckboxModule, NbTabsetModule, NbCardModule, NbAccordionModule, NbRouteTabsetModule } from '@nebular/theme';
import { EditExpensesComponent } from './edit-expenses/edit-expenses.component';


@NgModule({
  declarations: [ExpenseManagerComponent, AllExpenseComponent, EditExpensesComponent],
  imports: [
    CommonModule,
    ExpenseManagerRoutingModule,
    NbIconModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbInputModule,
    FormsModule,
    NbCheckboxModule,
    NbTabsetModule,
    NbCardModule,
    NbAccordionModule,
    NbRouteTabsetModule,
  ]
})
export class ExpenseManagerModule { }
