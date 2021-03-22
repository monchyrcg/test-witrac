import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Observable } from 'rxjs';

import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import * as moment from 'moment';
import { MenuComponent } from 'src/app/dashboard/home/menu/menu.component';
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';


@Component({
    selector: 'app-customer-edit-appointments-calendar',
    templateUrl: './customer-edit-appointments-calendar.component.html',
    styleUrls: ['../customer-edit-appointments.component.scss', './customer-edit-appointments-calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomerEditAppointmentsCalendarComponent implements OnInit, OnDestroy {

    @Input() customer;
    @Output() showAppointmentOutput = new EventEmitter<any>();

    isOpenView: boolean = false;

    appointments = [];

    viewDate: Date = new Date();
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;

    events$: Observable<CalendarEvent<{}>[]>;

    currentDay = moment().format('YYYY-MM-DD');

    viewName: string;

    dayStartHour: number;
    dayEndHour: number;
    excludeDays: number[];

    constructor(
        public settingGeneralService: SettingGeneralService,
        public appointmentService: AppointmentService,
        public menuComponent: MenuComponent,
        private authService: AuthenticationGeneralService
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

        this.dayStartHour = (this.authService.getUserVariable('start_hour')).split(':')[0];
        this.dayEndHour = (this.authService.getUserVariable('finish_hour')).split(':')[0];

        this.excludeDays = this.generateExcludeDays();
    }

    generateExcludeDays(): number[] {
        const days = this.authService.getUserVariable('days');

        let excludeDays: number[] = [];
        for (let index = 0; index < 7; index++) {
            if (!days.includes(index)) {
                if (index == 6) {
                    excludeDays.push(0);
                } else {
                    excludeDays.push(index + 1);
                }
            }
        }

        return excludeDays;
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

    eventClicked($event) {
        this.showAppointmentOutput.emit($event.event);
    }

    ngOnDestroy(): void {

    }

}