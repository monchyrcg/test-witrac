import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';


@Component({
    selector: 'app-customer-edit-appointments-list',
    templateUrl: './customer-edit-appointments-list.component.html'
})

export class CustomerEditAppointmentsListComponent implements OnInit {

    @Input() customer;
    @Output() showAppointmentOutput = new EventEmitter<any>();

    appointments;
    lengthLg: number;

    constructor(
        public settingGeneralService: SettingGeneralService,
    ) { }

    ngOnInit(): void {
        this.appointments = this.customer.appointments;

        this.lengthLg = this.appointments.length > 4 ? 4 : this.appointments.length;
    }

    changeShowAppointment(appointment?) {
        this.showAppointmentOutput.emit(appointment);
    }
}