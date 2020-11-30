import { Component, OnInit, OnDestroy, Input } from '@angular/core';


@Component({
    selector: 'app-customer-edit-appointments',
    templateUrl: './customer-edit-appointments.component.html'
})

export class CustomerEditAppointmentComponent implements OnInit, OnDestroy {

    @Input() customer;

    ngOnInit(): void {

    }

    ngOnDestroy(): void {

    }


}