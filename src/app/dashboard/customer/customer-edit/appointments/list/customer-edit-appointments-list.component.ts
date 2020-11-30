import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionI } from 'src/app/shared/interfaces/option.interface';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import { Validations } from 'src/app/shared/settings/validation';


@Component({
    selector: 'app-customer-edit-appointments-list',
    templateUrl: './customer-edit-appointments-list.component.html',
    animations: [
        trigger(
            'enterAnimation', [
            transition(':enter', [
                style({ transform: 'translateY(100%)', opacity: 0 }),
                animate('500ms', style({ transform: 'translateY(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ transform: 'translateY(0)', opacity: 1 }),
                animate('500ms', style({ transform: 'translateY(100%)', opacity: 0 }))
            ])
        ]
        )
    ],
    styleUrls: ['../../customer-edit.component.scss']
})

export class CustomerEditAppointmentsListComponent implements OnInit, OnDestroy {

    @Input() customer;
    appointmentDataForm: FormGroup;
    submitted = false;

    showAppointment = false;

    appointments;

    validationMaxString = Validations.validationMaxString;

    options: OptionI[] = [];

    constructor(
        private builder: FormBuilder,
        public settingGeneralService: SettingGeneralService
    ) {
        this.options.push({ id: 1, text: this.settingGeneralService.getLangText('options.yes') });
        this.options.push({ id: 0, text: this.settingGeneralService.getLangText('options.no') });
    }

    ngOnInit(): void {
        this.appointments = this.customer.appointments;
    }

    get f() { return this.appointmentDataForm.controls; }

    ngOnDestroy(): void {

    }

    changeShowAppointment(value: boolean, appointment?) {
        this.showAppointment = value;
        if (value) {
            this.appointmentDataForm = this.builder.group({
                weight: [appointment ? appointment.weight : '', [Validators.required]],
                weight_objetive: [appointment ? appointment.weight_objetive : '', [Validators.required]],
                five_meals: [appointment ? appointment.five_meals : '', [Validators.required]],
                water: [appointment ? appointment.water : '', [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
                digestion: [appointment ? appointment.digestion : '', [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
                stools: [appointment ? appointment.stools : '', [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
                notes: [appointment ? appointment.notes : '', [Validators.required, Validators.maxLength(this.validationMaxString.text)]],
            });
        }
    }
}