import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/cutomer-list.component';



const routes: Routes = [
    {
        path: '',
        component: CustomerListComponent
    },
    {
        path: ':hash',
        component: CustomerListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    // exports: [RouterModule]
})
export class CustomerRoutingModule {

}