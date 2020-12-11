import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
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
        Ng2FlatpickrModule,
        GooglePlaceModule,
    ],
    exports: [
        SharedModule,
    ],
    providers: [],
})

export class AppointmentsModule { }

