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
import { SharedModule } from '../shared/modules/shared.module';

import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NavBarComponent } from './home/navbar/navbar.component';
import { CustomerComponent } from './home/navbar/customer/customer.component';

import { Ng2FlatpickrModule } from 'ng2-flatpickr';


/* export function momentAdapterFactory(): DateAdapter {
    return adapterFactory(moment);
} */

registerLocaleData(localeEs);
registerLocaleData(localeEn);
registerLocaleData(localeFr);
registerLocaleData(localeIt);

@NgModule({
    declarations: [
        HomeComponent,
        NavBarComponent,
        CalendarComponent,
        CustomerComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        DashboardRoutingModule,
        RouterModule,
        Ng2FlatpickrModule,
        // NgxPermissionsModule.forChild()
    ],
    providers: [],
})

export class DashboardModule {

}