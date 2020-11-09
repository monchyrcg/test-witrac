import { Input } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Spanish from 'flatpickr/dist/l10n/es.js';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Gender } from 'src/app/shared/interfaces/gender.interface';
import { SettingsService } from 'src/app/shared/services/settings.service';
import * as moment from 'moment';
import { Countries } from 'src/app/shared/settings/country';
import { Validations } from 'src/app/shared/settings/validation';

@Component({
    selector: 'app-customer-edit-general',
    templateUrl: './customer-edit-general.component.html',
    // styleUrls: ['./customer-edit.component.scss']
})

export class CustomerEditGeneralComponent implements OnInit, OnDestroy {

    genders: Gender[] = [];
    customerForm: FormGroup;
    submitted = false;

    @Input() customer;

    legal_age: number;
    under: boolean;

    validationMaxString = Validations.validationMaxString;

    dateOptions: FlatpickrOptions;

    constructor(
        private builder: FormBuilder,
        public settingService: SettingsService
    ) {
        this.dateOptions = {
            locale: this.settingService.settings.flatpickr,
            dateFormat: this.settingService.settings.formatFlatpickr,
            maxDate: moment().format(this.settingService.settings.formatMoment),
            disableMobile: true,
        };
    }

    ngOnInit(): void {
        this.under = this.customer.legal ? true : false;
        this.dateOptions.defaultDate = moment(this.customer.dob).format(this.settingService.settings.formatMoment);

        this.settingService.changeCountry$.subscribe(
            (settings) => {
                this.legal_age = settings.legal_age;
                this.dateOptions.locale = settings.flatpickr;
                this.dateOptions.dateFormat = settings.formatFlatpickr;
                this.dateOptions.maxDate = moment().format(settings.formatMoment);
                this.dateOptions.defaultDate = moment(this.customer.dob).format(settings.formatMoment);
            }
        );

        this.genders.push({ id: 1, text: this.settingService.getLangText('genders.male') });
        this.genders.push({ id: 2, text: this.settingService.getLangText('genders.female') });

        this.customerForm = this.builder.group({
            name: [this.customer.name, [Validators.required, Validators.maxLength(this.validationMaxString.short_string)]],
            surnames: [this.customer.surnames, [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            gender: [this.customer.gender, [Validators.required]],
            team_id: [this.customer.team_id, [Validators.required]],
            dob: [this.customer.dob, [Validators.required]],
            job: [this.customer.job, [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            prefix: [this.customer.prefix, [Validators.required]],
            mobile: [this.customer.mobile, [Validators.required]],
            email: [this.customer.email, [Validators.required, Validators.email, Validators.maxLength(this.validationMaxString.long_string)]],
            legal_checkbox: [this.customer.legal ? this.customer.legal.name : null],
            legal_name: [this.customer.legal ? this.customer.legal.name : null, [Validators.maxLength(this.validationMaxString.short_string)]],
            legal_surnames: [this.customer.legal ? this.customer.legal.surnames : null, [Validators.maxLength(this.validationMaxString.long_string)]],
            legal_identity: [this.customer.legal ? this.customer.legal.identity : null, [Validators.maxLength(this.validationMaxString.short_string)]],
        });
    }

    get f() { return this.customerForm.controls; }

    changeDob($event) {
        const dob = $event.target.value;
        const dobFormat = moment(dob, this.settingService.settings.formatMoment);
        const last = moment().subtract(this.legal_age, 'years').format(this.settingService.settings.formatMoment);

        const legalFields = ['legal_checkbox', 'legal_name', 'legal_identity'];
        if (dobFormat.isAfter(last, 'day')) {
            legalFields.forEach(element => {
                this.customerForm.get(element).setValidators([Validators.required]);
            });

            this.under = true;
        } else {
            legalFields.forEach(element => {
                let currentElement = this.customerForm.get(element);
                currentElement.clearValidators();
                currentElement.setValue('');
            });

            this.under = false;
        }
        legalFields.forEach(element => {
            this.customerForm.get(element).updateValueAndValidity();
        });
    }

    ngOnDestroy(): void {

    }

}