import { Component, ViewChild, TemplateRef, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import * as moment from 'moment';
import { MenuComponent } from '../home/menu/menu.component';
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarComponent implements OnInit, OnDestroy {

	view: CalendarView = CalendarView.Month;

	locale: string = localStorage.getItem('locale');

	weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

	weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

	CalendarView = CalendarView;

	viewDate: Date = new Date();

	refresh: Subject<any> = new Subject();

	events$: Observable<CalendarEvent<{}>[]>;

	currentDay = moment().format('YYYY-MM-DD');

	isOpenView: boolean = false;

	viewName: string;

	dayStartHour: number;
	dayEndHour: number;
	excludeDays: number[];

	constructor(
		public settingGeneralService: SettingGeneralService,
		public appointmentService: AppointmentService,
		public menuComponent: MenuComponent,
		private authService: AuthenticationGeneralService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.events$ = this.appointmentService.listAppointment(this.currentDay);
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

	dayClicked(date: Date): void {
		this.menuComponent.createAppointment(date)
	}

	eventClicked(event) {
		this.router.navigate(['customers/' + event.event.customer_id]);
	}

	setView(view: CalendarView): void {
		this.isOpenView = false;
		this.view = view;
		this.viewName = this.settingGeneralService.getLangText('calendar.' + view);
	}

	closeOpenMonthViewDay(): void {
		const newDay = moment(this.viewDate).format('YYYY-MM-DD');

		if (moment(newDay).format('MM') != moment(this.currentDay).format('MM')) {
			this.currentDay = newDay;

			this.events$ = this.appointmentService.listAppointment(newDay);
		}

	}

	ngOnDestroy() {

	}

}
