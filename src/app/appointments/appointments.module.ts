import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { SharedModule } from '../shared/modules/shared.module';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';

@NgModule({
    declarations: [
        AppointmentsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AppointmentsRoutingModule,
        Ng2FlatpickrModule
    ],
    exports: [
        SharedModule,

    ],
    providers: [],
})

export class AppointmentsModule { }