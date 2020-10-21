import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
    selector: 'app-customer-edit-calendar',
    templateUrl: './customer-edit-calendar.component.html',
    // styleUrls: ['./customer-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomerEditCalendarComponent implements OnInit, OnDestroy {

    viewDate: Date = new Date();

    constructor(
        public settingService: SettingsService,
    ) { }

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
    }
    ngOnDestroy(): void {
        // throw new Error('Method not implemented.');
    }

}