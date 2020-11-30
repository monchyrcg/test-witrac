import { Component, OnInit, OnDestroy, Input } from '@angular/core';


@Component({
    selector: 'app-customer-edit-appointments',
    templateUrl: './customer-edit-appointments.component.html',
    styleUrls: ['./customer-edit-appointments.component.scss']
})

export class CustomerEditAppointmentComponent implements OnInit, OnDestroy {

    @Input() customer;
    calendar: boolean = true;

    ngOnInit(): void {

    }

    changeView(showCalendar) {
        this.calendar = showCalendar;
    }

    ngOnDestroy(): void {

    }


}