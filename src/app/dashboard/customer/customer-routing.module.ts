import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerEditNutritionalPlanComponent } from './customer-edit/nutritional-plan/customer-edit-nutritional-plan.component';



const routes: Routes = [
    {
        path: '',
        component: CustomerListComponent
    },
    {
        path: ':hash',
        component: CustomerEditComponent
    },
    {
        path: ':hash/nutritional-plan',
        component: CustomerEditNutritionalPlanComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    // exports: [RouterModule]
})
export class CustomerRoutingModule {

}