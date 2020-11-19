import { Component, ViewChild, TemplateRef, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import * as moment from 'moment';
import { MenuComponent } from '../home/menu/menu.component';

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

	constructor(
		public settingGeneralService: SettingGeneralService,
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
