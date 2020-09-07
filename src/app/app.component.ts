import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import axios from "axios";
import { TranslateService } from '@ngx-translate/core';

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
  selector: 'app-root',
  templateUrl: './tailwind.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  isOpen = false;
  isOpenMobile = true;

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

  constructor(private modal: NgbModal, private http: HttpClient, private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
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

  login(): void {
    const url = `http://api.pruebas.test/sanctum/csrf-cookie`;
    axios.defaults.withCredentials = true;
    axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' };
    axios.get(url).then((res) => { console.log(res); });
    /* this.http.get<any>(url).subscribe((res) => {
      console.log(res);

      // the response is correct but not set the cookies
      // this.http.post<any>('http://pruebas.test/api/v1/login', { password: 'password', 'email': 'twatsica@example.com' }).subscribe(success => {
      //   console.log(success);
      //   this.http.get<any>('http://pruebas.test/api/v1/articles').subscribe(success => console.log(success));
      // }
      //   , error => console.log(error))
    }) */
  }
}
