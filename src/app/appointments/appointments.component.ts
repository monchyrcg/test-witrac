import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { AppointmentExternal } from '../shared/interfaces/appointment.interface';
import { Illnes } from '../shared/interfaces/illnes.interface';
import { OptionI } from '../shared/interfaces/option.interface';
import { SettingGeneralService } from '../shared/services/settings-general.service';
import { UtilsService } from '../shared/services/util.service';
import { Validations } from '../shared/settings/validation';
import { AppointmentsService } from './appointments.service';

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.scss'],
    animations: [
        trigger(
            'enterAnimation', [
            transition(':enter', [
                style({ transform: 'translateY(100%)', opacity: 0 }),
                animate('500ms', style({ transform: 'translateY(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                // style({ transform: 'translateY(100%)', opacity: 1 }),
                animate('500ms', style({ transform: 'translateY(0)', opacity: 0 }))
            ])
        ]
        )
    ],
})
export class AppointmentsComponent implements OnInit {

    customer;
    customerCrypt;
    isOpenMobile = true;
    selected = false;
    is_clicked = true;
    is_signed = false;

    dateOptions: FlatpickrOptions;

    disableDays = ["2020-12-25", "12-31-2020", "01-01-2021"];

    setHours = null;
    hours = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];

    appointmentForm: FormGroup;
    validationMaxString = Validations.validationMaxString;

    stepNumber: number = 1;

    options: OptionI[] = [];
    illnesses: Illnes[] = [];

    constructor(
        private builder: FormBuilder,
        private signPrivacyService: AppointmentsService,
        public settingGeneralService: SettingGeneralService,
        private utilService: UtilsService
    ) {
        this.options.push({ id: 1, text: this.settingGeneralService.getLangText('options.yes') });
        this.options.push({ id: 0, text: this.settingGeneralService.getLangText('options.no') });

        this.illnesses.push({ id: 1, text: this.settingGeneralService.getLangText('illnesses.diabetes') });
        this.illnesses.push({ id: 2, text: this.settingGeneralService.getLangText('illnesses.heart') });
        this.illnesses.push({ id: 3, text: this.settingGeneralService.getLangText('illnesses.cancer') });

        this.dateOptions = {
            wrap: false,
            inline: true,
            locale: this.settingGeneralService.settings.flatpickr,
            dateFormat: this.settingGeneralService.settings.formatFlatpickr,
            minDate: moment().format(this.settingGeneralService.settings.formatMoment),
            disableMobile: true,
            disable: this.configDates()
        };
    }


    ngOnInit(): void {
        this.customer = 'a';
        this.setHours = this.hours;
        this.appointmentForm = this.builder.group({
            date: [{ 0: moment().format(this.settingGeneralService.settings.formatMoment) }, [Validators.required]],
            hour: [null, [Validators.required]],
            duration: [30, [Validators.required]],
            name: [null, [Validators.required, Validators.maxLength(this.validationMaxString.short_string)]],
            surnames: [null, [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            supplements: ['', [Validators.required]],
            illnesses: ['', [Validators.required]],
            prefix: ['', [Validators.required]],
            mobile: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(this.validationMaxString.long_string)]],
            cp: [null, [Validators.required]]
        });
    }

    configDates() {
        let correctFormatDays = [];

        this.disableDays.forEach(element => {
            correctFormatDays.push(moment(element).format(this.settingGeneralService.settings.formatMoment));
        });

        return correctFormatDays;
    }

    changeDay($event) {
        this.setHours = null;
        this.getHours();
    }

    getHours() {
        this.appointmentForm.controls['hour'].setValue(null);
        setTimeout(() => {
            this.setHours = this.hours;
        }, 800);
    }

    setHour(hour) {
        this.appointmentForm.controls['hour'].setValue(hour);
        console.log(this.appointmentForm.value);
        this.stepNumber = 2;
    }



    submit() {
        let appointment: AppointmentExternal = this.utilService.clear(this.appointmentForm.value);
    }
}