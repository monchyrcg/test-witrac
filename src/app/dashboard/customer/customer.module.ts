import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { createTranslateLoader, SharedModule } from 'src/app/shared/modules/shared.module';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
    declarations: [
        CustomerListComponent,
        CustomerEditComponent

    ],
    imports: [
        CommonModule,
        SharedModule,
        Ng2FlatpickrModule,
        CustomerRoutingModule
    ],
    exports: [
        SharedModule,
    ],
    providers: [],
})

export class CustomerModule {

}