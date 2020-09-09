import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';

import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';

import { SharedModule } from '../shared/modules/shared.module';

export function momentAdapterFactory(): DateAdapter {
    return adapterFactory(moment);
}

@NgModule({
    declarations: [
        HomeComponent,
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