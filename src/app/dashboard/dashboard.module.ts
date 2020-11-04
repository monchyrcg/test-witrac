import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/it';
import localeIt from '@angular/common/locales/fr';

import { CalendarModule, DateAdapter } from 'angular-calendar';

// import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import * as moment from 'moment';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { RouterModule } from '@angular/router';
import { createTranslateLoader, SharedModule } from '../shared/modules/shared.module';

import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MenuComponent } from './home/menu/menu.component';
import { CustomerComponent } from './home/menu/customer/customer.component';

import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { AppointmentComponent } from './home/menu/appointment/appointment.component';
import { CustomerModule } from './customer/customer.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

/* export function momentAdapterFactory(): DateAdapter {
    return adapterFactory(moment);
} */

registerLocaleData(localeEs);
registerLocaleData(localeEn);
registerLocaleData(localeFr);
registerLocaleData(localeIt);

@NgModule({
    declarations: [
        MenuComponent,
        HomeComponent,
        CalendarComponent,
        CustomerComponent,
        AppointmentComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        // CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        DashboardRoutingModule,
        RouterModule,
        Ng2FlatpickrModule,
    ],
    exports: [
        SharedModule
    ],
    providers: [],
})

export class DashboardModule {

}