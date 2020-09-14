import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

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
export class CalendarComponent {

	@ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

	view: CalendarView = CalendarView.Month;

	CalendarView = CalendarView;

	viewDate: Date = new Date();

	modalData: {
		action: string;
		event: CalendarEvent;
	};

	actions: CalendarEventAction[] = [
		{
			label: '<i class="fas fa-fw fa-pencil-alt"></i>',
			a11yLabel: 'Edit',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				this.handleEvent('Edited', event);
			},
		},
		{
			label: '<i class="fas fa-fw fa-trash-alt"></i>',
			a11yLabel: 'Delete',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				this.events = this.events.filter((iEvent) => iEvent !== event);
				this.handleEvent('Deleted', event);
			},
		},
	];

	refresh: Subject<any> = new Subject();

	now = moment();

	events: CalendarEvent[] = [
		{
			start: this.now.startOf('day').subtract(1).toDate(),
			end: this.now.add(1).toDate(),
			title: 'A 3 day event',
			color: colors.red,
			actions: this.actions,
			allDay: true,
			resizable: {
				beforeStart: true,
				afterEnd: true,
			},
			draggable: true,
		},
		{
			start: this.now.startOf('day').toDate(),
			title: 'An event with no end date',
			color: colors.yellow,
			actions: this.actions,
		},
		{
			start: this.now.endOf('month').subtract(3).toDate(),
			end: this.now.endOf('month').add(3).toDate(),
			title: 'A long event that spans 2 months',
			color: colors.blue,
			allDay: true,
		},
        /* {
          start: addHours(startOfDay(new Date()), 2),
          end: addHours(new Date(), 2),
          title: 'A draggable and resizable event',
          color: colors.yellow,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
        }, */
	];

	activeDayIsOpen = true;

	constructor(private modal: NgbModal, private http: HttpClient) {

	}

	dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
		if (moment(date).isSame(this.viewDate, 'month')) {
			if (
				(moment(this.viewDate).isSame(date, 'day') && this.activeDayIsOpen === true) ||
				events.length === 0
			) {
				this.activeDayIsOpen = false;
			} else {
				this.activeDayIsOpen = true;
			}
			this.viewDate = date;
		}
	}

	eventTimesChanged({
		event,
		newStart,
		newEnd,
	}: CalendarEventTimesChangedEvent): void {
		this.events = this.events.map((iEvent) => {
			if (iEvent === event) {
				return {
					...event,
					start: newStart,
					end: newEnd,
				};
			}
			return iEvent;
		});
		this.handleEvent('Dropped or resized', event);
	}

	handleEvent(action: string, event: CalendarEvent): void {
		this.modalData = { event, action };
		this.modal.open(this.modalContent, { size: 'lg' });
	}

	addEvent(): void {
		this.events = [
			...this.events,
			{
				title: 'New event',
				start: this.now.startOf('day').toDate(),
				end: this.now.endOf('day').toDate(),
				color: colors.red,
				draggable: true,
				resizable: {
					beforeStart: true,
					afterEnd: true,
				},
			},
		];
	}

	deleteEvent(eventToDelete: CalendarEvent): void {
		this.events = this.events.filter((event) => event !== eventToDelete);
	}

	setView(view: CalendarView): void {
		this.view = view;
	}

	closeOpenMonthViewDay(): void {
		this.activeDayIsOpen = false;
	}

}
