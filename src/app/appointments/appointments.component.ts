import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { AppointmentExternal } from '../shared/interfaces/appointment.interface';
import { SettingGeneralService } from '../shared/services/settings-general.service';
import { UtilsService } from '../shared/services/util.service';
import { AppointmentsService } from './appointments.service';

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

    customer;
    customerCrypt;
    isOpenMobile = true;
    selected = false;
    is_clicked = true;
    is_signed = false;

    dateOptions: FlatpickrOptions;

    disableDays = ["25-12-2020", "12-31-2020", "01-01-2021"];

    setHours = null;
    hours = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];

    appointmentForm: FormGroup;

    constructor(
        private builder: FormBuilder,
        private signPrivacyService: AppointmentsService,
        public settingGeneralService: SettingGeneralService,
        private utilService: UtilsService
    ) {
        this.dateOptions = {
            wrap: false,
            inline: true,
            locale: this.settingGeneralService.settings.flatpickr,
            dateFormat: this.settingGeneralService.settings.formatFlatpickr,
            minDate: moment().format(this.settingGeneralService.settings.formatMoment),
            disableMobile: true,
            disable: this.disableDays
        };
    }


    ngOnInit(): void {
        this.customer = 'a';
        this.setHours = this.hours;
        this.appointmentForm = this.builder.group({
            date: [null, [Validators.required]],
            hour: [null, [Validators.required]],
            duration: [null, [Validators.required]],
        });
    }

    changeDay($event) {
        this.setHours = null;
        const dob = $event.target.value;
        this.getHours();
    }

    getHours() {
        setTimeout(() => {
            this.setHours = this.hours;
        }, 800);

    }

    setHour(hour) {
        console.log(hour);
    }



    submit() {
        let appointment: AppointmentExternal = this.utilService.clear(this.appointmentForm.value);
    }
}