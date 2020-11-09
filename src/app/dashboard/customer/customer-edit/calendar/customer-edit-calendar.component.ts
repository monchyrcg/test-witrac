import { Input } from '@angular/core';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
    selector: 'app-customer-edit-calendar',
    templateUrl: './customer-edit-calendar.component.html',
    // styleUrls: ['./customer-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomerEditCalendarComponent implements OnInit, OnDestroy {

    viewDate: Date = new Date();
    @Input() appointments;

    events$: Observable<CalendarEvent<{}>[]>;

    constructor(
        public settingService: SettingsService,
    ) { }

    ngOnInit(): void {
        this.appointments.forEach((element, index) => {
            this.appointments[index].start = new Date(element.start)
        });
    }


    ngOnDestroy(): void {

    }

}