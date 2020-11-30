import { Input } from '@angular/core';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Observable } from 'rxjs';

import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import * as moment from 'moment';
import { MenuComponent } from 'src/app/dashboard/home/menu/menu.component';


@Component({
    selector: 'app-customer-edit-appointments-calendar',
    templateUrl: './customer-edit-appointments-calendar.component.html',
    styleUrls: ['../customer-edit-appointments.component.scss', './customer-edit-appointments-calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomerEditAppointmentsCalendarComponent implements OnInit, OnDestroy {

    @Input() customer;

    isOpenView: boolean = false;

    appointments = [];

    viewDate: Date = new Date();
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;

    events$: Observable<CalendarEvent<{}>[]>;

    currentDay = moment().format('YYYY-MM-DD');

    viewName: string;

    constructor(
        public settingGeneralService: SettingGeneralService,
        public appointmentService: AppointmentService,
        public menuComponent: MenuComponent
    ) {
        this.viewName = this.settingGeneralService.getLangText('calendar.month');
    }

    ngOnInit(): void {
        this.listAppointments();

        this.appointmentService.listAppointmentCustomer$.subscribe(
            (response) => {
                this.events$ = response;
            }
        );
    }

    listAppointments(newDay?) {
        this.appointmentService.listAppointmentCustomer(this.customer.id, newDay ? newDay : this.currentDay);
    }

    setView(view: CalendarView): void {
        this.isOpenView = false;
        this.view = view;
        this.viewName = this.settingGeneralService.getLangText('calendar.' + view);
    }

    dayClicked(date: Date): void {
        this.menuComponent.createAppointment(date, this.customer)
    }

    closeOpenMonthViewDay(): void {
        const newDay = moment(this.viewDate).format('YYYY-MM-DD');

        if (moment(newDay).format('MM') != moment(this.currentDay).format('MM')) {
            this.currentDay = newDay;

            this.listAppointments(newDay);
        }
    }

    ngOnDestroy(): void {

    }

}