import { Component, ViewChild, TemplateRef, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import * as moment from 'moment';
import { MenuComponent } from '../home/menu/menu.component';

const colors: any = {
	red: {
		primary: '#ad2122',
		secondary: '#FAE3E3',
	},
	blue: {
		primary: '#1e90ff',
		secondary: '#D1E8FF',
	},
	yellow: {
		primary: '#e3bc08',
		secondary: '#FDF1BA',
	},
};

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarComponent implements OnInit, OnDestroy {

	activeDayIsOpen: boolean = true;

	view: CalendarView = CalendarView.Month;

	locale: string = localStorage.getItem('locale');

	weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

	weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

	CalendarView = CalendarView;

	viewDate: Date = new Date();

	modalData: {
		action: string;
		event: CalendarEvent;
	};

	refresh: Subject<any> = new Subject();

	events$: Observable<CalendarEvent<{}>[]>;

	currentDay = moment().format('YYYY-MM-DD');

	constructor(
		public settingService: SettingsService,
		public appointmentService: AppointmentService,
		public menuComponent: MenuComponent
	) { }

	ngOnInit(): void {
		this.events$ = this.appointmentService.listAppointment(this.currentDay);
	}

	dayClicked(date: Date): void {
		this.menuComponent.createAppointment(date)
	}

	eventClicked(event) {
		console.log(event);
	}

	setView(view: CalendarView): void {
		this.view = view;
	}

	closeOpenMonthViewDay() {
		this.activeDayIsOpen = false;
	}

	ngOnDestroy() {

	}

}
