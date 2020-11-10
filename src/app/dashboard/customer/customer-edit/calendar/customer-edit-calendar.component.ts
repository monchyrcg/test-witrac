import { Input } from '@angular/core';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Observable } from 'rxjs';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import * as moment from 'moment';


@Component({
    selector: 'app-customer-edit-calendar',
    templateUrl: './customer-edit-calendar.component.html',
    styleUrls: ['./customer-edit-calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomerEditCalendarComponent implements OnInit, OnDestroy {

    @Input() customer_id;

    isOpenView: boolean = false;

    appointments = [];

    viewDate: Date = new Date();
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;

    events$: Observable<CalendarEvent<{}>[]>;

    currentDay = moment().format('YYYY-MM-DD');

    viewName: string;

    constructor(
        public settingService: SettingsService,
        public appointmentService: AppointmentService
    ) {
        this.viewName = this.settingService.getLangText('calendar.month');
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
        this.appointmentService.listAppointmentCustomer(this.customer_id, newDay ? newDay : this.currentDay);
    }

    setView(view: CalendarView): void {
        this.isOpenView = false;
        this.view = view;
        this.viewName = this.settingService.getLangText('calendar.' + view);
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