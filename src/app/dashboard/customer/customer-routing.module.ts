import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';



const routes: Routes = [
    {
        path: '',
        component: CustomerListComponent
    },
    {
        path: ':hash',
        component: CustomerEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    // exports: [RouterModule]
})
export class CustomerRoutingModule {

}