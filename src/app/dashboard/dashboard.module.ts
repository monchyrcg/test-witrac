import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/it';
import localeIt from '@angular/common/locales/fr';
import { CalendarModule, DateAdapter } from 'angular-calendar';

import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NavBarComponent } from './home/navbar/navbar.component';

import { SharedModule } from '../shared/modules/shared.module';

export function momentAdapterFactory(): DateAdapter {
    return adapterFactory(moment);
}

registerLocaleData(localeEs);
registerLocaleData(localeEn);
registerLocaleData(localeFr);
registerLocaleData(localeIt);

@NgModule({
    declarations: [
        HomeComponent,
        NavBarComponent,
        CalendarComponent
    ],
    imports: [
        CommonModule,
        CommonModule,
        SharedModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
        DashboardRoutingModule,
        RouterModule
    ],
    providers: [],
})

export class DashboardModule {

}