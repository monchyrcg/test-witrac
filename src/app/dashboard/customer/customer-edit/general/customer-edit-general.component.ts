import { Input } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Spanish from 'flatpickr/dist/l10n/es.js';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import * as moment from 'moment';
import { Countries } from 'src/app/shared/settings/country';
import { Validations } from 'src/app/shared/settings/validation';
import { Subscription } from 'rxjs';
import { CustomerCreated } from 'src/app/shared/interfaces/customers.interface';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { UtilsService } from 'src/app/shared/services/util.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Illnes } from 'src/app/shared/interfaces/illnes.interface';
import { OptionI } from 'src/app/shared/interfaces/option.interface';
import { AutocompleteMapService } from 'src/app/shared/services/autcomplete-maps.service';
import { Gender } from 'src/app/shared/interfaces/gender.interface';

@Component({
    selector: 'app-customer-edit-general',
    templateUrl: './customer-edit-general.component.html',
    // styleUrls: ['../customer-edit.component.scss']
})

export class CustomerEditGeneralComponent implements OnInit, OnDestroy {

    options: OptionI[] = [];
    illnesses: Illnes[] = [];
    genders: Gender[] = [];
    customerForm: FormGroup;
    submitted = false;

    @Input() customer;

    legal_age: number;
    under: boolean;

    validationMaxString = Validations.validationMaxString;

    dateOptions: FlatpickrOptions;

    private subscription = new Subscription();

    autocompleteOptions;
    noCpError: boolean = false;

    constructor(
        private builder: FormBuilder,
        public settingGeneralService: SettingGeneralService,
        private utilService: UtilsService,
        private snackbarService: SnackbarService,
        private customerService: CustomerService,
        private autocompleteService: AutocompleteMapService
    ) {
        this.options.push({ id: 1, text: this.settingGeneralService.getLangText("options.yes") });
        this.options.push({ id: 0, text: this.settingGeneralService.getLangText('options.no') });

        this.illnesses.push({ id: 1, text: this.settingGeneralService.getLangText('illnesses.diabetes') });
        this.illnesses.push({ id: 2, text: this.settingGeneralService.getLangText('illnesses.heart') });
        this.illnesses.push({ id: 3, text: this.settingGeneralService.getLangText('illnesses.cancer') });
        this.illnesses.push({ id: 4, text: this.settingGeneralService.getLangText('illnesses.none') });

        this.genders.push({ id: 2, text: this.settingGeneralService.getLangText("genders.male") });
        this.genders.push({ id: 1, text: this.settingGeneralService.getLangText('genders.female') });

        this.dateOptions = {
            locale: this.settingGeneralService.settings.flatpickr,
            dateFormat: this.settingGeneralService.settings.formatFlatpickr,
            maxDate: moment().format(this.settingGeneralService.settings.formatMoment),
            disableMobile: true,
        };
    }

    ngOnInit(): void {
        this.autocompleteService.renderExternalScript(this.settingGeneralService.settings.locale).onload = () => {
            this.under = this.customer.legal ? true : false;
            this.dateOptions.defaultDate = moment(this.customer.dob).format(this.settingGeneralService.settings.formatMoment);

            this.settingGeneralService.changeCountry$.subscribe(
                (settings) => {
                    this.legal_age = settings.legal_age;
                    this.dateOptions.locale = settings.flatpickr;
                    this.dateOptions.dateFormat = settings.formatFlatpickr;
                    this.dateOptions.maxDate = moment().format(settings.formatMoment);
                    this.dateOptions.defaultDate = moment(this.customer.dob).format(settings.formatMoment);
                }
            );

            this.customerForm = this.builder.group({
                id: this.customer.id,
                gender: [this.customer.gender, [Validators.required]],
                name: [this.customer.name, [Validators.required, Validators.maxLength(this.validationMaxString.short_string)]],
                surnames: [this.customer.surnames, [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
                team_id: [this.customer.team_id, [Validators.required]],
                dob: [null != this.customer.dob ? { 0: this.customer.dob } : null, [Validators.required]],
                prefix: [this.customer.prefix, [Validators.required]],
                mobile: [this.customer.mobile, [Validators.required]],
                supplement: [this.customer.supplement, [Validators.required]],
                illness: [this.customer.illness, [Validators.required]],
                zip: [this.customer.zip, [Validators.required]],
                email: [this.customer.email, [Validators.required, Validators.email, Validators.maxLength(this.validationMaxString.long_string)]],
                legal_checkbox: [this.customer.legal ? this.customer.legal.name : null],
                legal_name: [this.customer.legal ? this.customer.legal.name : null, [Validators.maxLength(this.validationMaxString.short_string)]],
                legal_surnames: [this.customer.legal ? this.customer.legal.surnames : null, [Validators.maxLength(this.validationMaxString.long_string)]],
                legal_identity: [this.customer.legal ? this.customer.legal.identity : null, [Validators.maxLength(this.validationMaxString.short_string)]],
            });

            this.autocompleteOptions = {
                types: ['(regions)'],
                componentRestrictions: { country: this.settingGeneralService.settings.zip_maps }
            };
        };
    }

    get f() { return this.customerForm.controls; }

    changeDob($event) {
        const dob = $event.target.value;
        const dobFormat = moment(dob, this.settingGeneralService.settings.formatMoment);
        const last = moment().subtract(this.legal_age, 'years').format(this.settingGeneralService.settings.formatMoment);

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

    onSubmit() {
        this.submitted = true;

        if (this.customerForm.invalid) {
            return;
        }

        let customer: CustomerCreated = this.utilService.clear(this.customerForm.value);
        customer.dob = moment(customer.dob[0]).format('YYYY-MM-DD');

        this.subscription.add(this.customerService.updateCustomer(customer).subscribe(
            (response) => {
                this.snackbarService.show('Customer updated successfully.', 'success');
            },
            (error) => {
                this.snackbarService.show('Algo ha pasado ....', 'danger');
            }
        ));
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
        this.subscription.unsubscribe();
    }

}