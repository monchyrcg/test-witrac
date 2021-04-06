import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';


@Component({
    selector: 'app-customer-edit-appointments-list',
    templateUrl: './customer-edit-appointments-list.component.html',
    styleUrls: ['./customer-edit-appointments-list.component.scss'],
})

export class CustomerEditAppointmentsListComponent implements OnInit {

    @Input() customer;
    @Output() showAppointmentOutput = new EventEmitter<any>();
    @Output() deleteAppointmentModal = new EventEmitter<any>();
    @Output() startAppointmentModal = new EventEmitter<any>();

    appointments;
    lengthLg: number;

    constructor(
        public settingGeneralService: SettingGeneralService,
    ) { }

    ngOnInit(): void {
        this.appointments = this.customer.appointments;

        this.lengthLg = this.appointments.length > 4 ? 4 : this.appointments.length;
    }

    changeShowAppointment(type, appointment?) {
        const event = {
            type: type,
            appointment: appointment
        };
        this.showAppointmentOutput.emit(event);
    }

    openNutritionalPlan(nutritionalPlan) {
        window.open('/external/customers/nutritional-plan/' + nutritionalPlan, "_blank");
    }

    generateDeleteAppointment(appointment) {
        this.deleteAppointmentModal.emit(appointment.id);
    }

    generateStartAppointment(appointment) {
        this.startAppointmentModal.emit(appointment)
    }
}