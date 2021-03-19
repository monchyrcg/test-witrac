import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CustomerExternal } from '../../shared/interfaces/customers.interface';
import { Illnes } from '../../shared/interfaces/illnes.interface';
import { OptionI } from '../../shared/interfaces/option.interface';
import { SettingGeneralService } from '../../shared/services/settings-general.service';
import { UtilsService } from '../../shared/services/util.service';
import { Validations } from '../../shared/settings/validation';
import { AppointmentsService } from './appointments.service';
import { AutocompleteMapService } from '../../shared/services/autcomplete-maps.service';

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
                style({ transform: 'translateY(100%)', opacity: 1 }),
                animate('500ms', style({ transform: 'translateY(0)', opacity: 0 }))
            ])
        ]
        )
    ],
})

export class AppointmentsComponent implements OnInit, OnDestroy {

    customer;
    isOpenMobile: boolean = true;
    selected: boolean = false;

    dateOptions: FlatpickrOptions;

    disableDays = ["2020-12-25", "12-31-2020", "01-01-2021"];

    setHours = null;
    hours = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];

    submitted: boolean = false;
    customerExternalForm: FormGroup;
    validationMaxString = Validations.validationMaxString;

    stepNumber: number = 1;

    options: OptionI[] = [];
    illnesses: Illnes[] = [];

    private subscription = new Subscription();

    // mobile
    isMobile: boolean = false;
    notShowCalendar: boolean = false;

    autocompleteOptions;
    noCpError: boolean = false;

    constructor(
        private builder: FormBuilder,
        private appointmentsService: AppointmentsService,
        public settingGeneralService: SettingGeneralService,
        private utilService: UtilsService,
        private deviceService: DeviceDetectorService,
        private autocompleteService: AutocompleteMapService
    ) {
        this.isMobile = this.deviceService.isMobile();

        this.options.push({ id: 1, text: this.settingGeneralService.getLangText("options.yes") });
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
        this.autocompleteService.renderExternalScript(this.settingGeneralService.settings.locale).onload = () => {
            this.autocompleteOptions = {
                types: ['(regions)'],
                componentRestrictions: { country: this.settingGeneralService.settings.zip_maps }
            };

            this.customer = 'a';
            this.setHours = this.hours;
            this.customerExternalForm = this.builder.group({
                date: [{ 0: moment().format(this.settingGeneralService.settings.formatMoment) }, [Validators.required]],
                hour: [null, [Validators.required]],
                duration: [30, [Validators.required]],
                name: [null, [Validators.required, Validators.maxLength(this.validationMaxString.short_string)]],
                surnames: [null, [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
                supplement: ['', [Validators.required]],
                illness: ['', [Validators.required]],
                prefix: ['', [Validators.required]],
                mobile: [null, [Validators.required]],
                email: [null, [Validators.required, Validators.email, Validators.maxLength(this.validationMaxString.long_string)]],
                zip: [null, [Validators.required]]
            });
        }
    }

    show(errors) {
        for (let key in errors) {
            console.log(key);
            console.log(errors[key]);
            // Your Code
        }
    }

    get f() { return this.customerExternalForm.controls; }

    configDates() {
        let correctFormatDays = [];

        this.disableDays.forEach(element => {
            correctFormatDays.push(moment(element).format(this.settingGeneralService.settings.formatMoment));
        });

        return correctFormatDays;
    }

    changeDay() {
        this.notShowCalendar = true;
        this.setHours = null;
        this.getHours();
    }

    getHours() {
        // to-do connect to logic calendar
        this.customerExternalForm.controls['hour'].setValue(null);
        setTimeout(() => {
            this.setHours = this.hours;
        }, 800);
    }

    setHour(hour) {
        this.customerExternalForm.controls['hour'].setValue(hour);
        this.stepNumber = 2;
    }

    comeBack() {
        this.submitted = false;
        this.customerExternalForm.reset();
        this.f.date.setValue({ 0: moment().format(this.settingGeneralService.settings.formatMoment) });
        this.notShowCalendar = false;
        this.stepNumber = 1;
    }

    onSubmit() {
        this.submitted = true;

        if (this.customerExternalForm.invalid) {
            return;
        }

        this.customer = null;
        let customerExternal: CustomerExternal = this.utilService.clear(this.customerExternalForm.value);
        customerExternal.date = moment(customerExternal.date[0]).format('YYYY-MM-DD');

        this.subscription.add(this.appointmentsService.saveCustomerAppointment(customerExternal).subscribe(
            (response) => {
                this.stepNumber = 3;
                this.customer = 'a';
            }
        ))
    }

    handleAddressChange($event) {
        this.f['zip'].setValue(null);
        this.noCpError = false;

        this.f['zip'].setValue(this.autocompleteService.autoComplete($event));

        if (null == this.f['zip'].value) {
            this.noCpError = true;
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}