import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerEditGeneralComponent } from './customer-edit/general/customer-edit-general.component';
import { CustomerEditMedicalHistoryComponent } from './customer-edit/medical-history/customer-edit-medical-history.component';
import { CustomerEditAppointmentComponent } from './customer-edit/appointments/customer-edit-appointments.component';
import { CustomerEditAppointmentsCalendarComponent } from './customer-edit/appointments/calendar/customer-edit-appointments-calendar.component';
import { CustomerEditAppointmentsListComponent } from './customer-edit/appointments/list/customer-edit-appointments-list.component';
import { CustomerEditNutritionalPlanComponent } from './customer-edit/nutritional-plan/customer-edit-nutritional-plan.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        CustomerListComponent,
        CustomerEditComponent,
        CustomerEditGeneralComponent,
        CustomerEditMedicalHistoryComponent,
        CustomerEditAppointmentComponent,
        CustomerEditAppointmentsCalendarComponent,
        CustomerEditAppointmentsListComponent,
        CustomerEditNutritionalPlanComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        Ng2FlatpickrModule,
        CustomerRoutingModule,
        DragDropModule
    ],
    exports: [
        SharedModule,
        DragDropModule
    ],
    providers: [],
})

export class CustomerModule {

}