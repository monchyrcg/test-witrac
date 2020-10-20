import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/cutomer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
    declarations: [
        CustomerListComponent,
        CustomerEditComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        Ng2FlatpickrModule,
        CustomerRoutingModule
    ],
    exports: [
        SharedModule,
        // RouterModule
    ],
    providers: [],
})

export class CustomerModule {

}