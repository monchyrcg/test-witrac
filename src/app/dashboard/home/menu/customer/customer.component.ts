import { Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Subscription } from 'rxjs';
import { Gender } from 'src/app/shared/interfaces/gender.interface';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import * as moment from 'moment';
import Spanish from 'flatpickr/dist/l10n/es.js';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer, CustomerCreated } from 'src/app/shared/interfaces/customers.interface';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { UtilsService } from 'src/app/shared/services/util.service';
import { Validations } from 'src/app/shared/settings/validation';


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html'
})

export class CustomerComponent implements OnInit, OnDestroy {

    @Input() title: string;
    @Input() text: string;
    @Input() text_button_register: string;
    @Output() closeModal;

    genders: Gender[] = [];
    customerForm: FormGroup;
    submitted = false;

    under: boolean = false;
    legal_age: number;
    validationMaxString = Validations.validationMaxString;

    private subscription = new Subscription();

    /* dateOptions: FlatpickrOptions = {
        locale: Spanish.es,
        dateFormat: 'd-m-Y',
        maxDate: moment().format('DD-MM-YYYY'),
        disableMobile: true
    }; */
    dateOptions: FlatpickrOptions;

    constructor(
        private builder: FormBuilder,
        public settingGeneralService: SettingGeneralService,
        private customerService: CustomerService,
        private snackbarService: SnackbarService,
        private utilService: UtilsService
    ) {
        this.dateOptions = {
            locale: this.settingGeneralService.settings.flatpickr,
            dateFormat: this.settingGeneralService.settings.formatFlatpickr,
            maxDate: moment().format(this.settingGeneralService.settings.formatMoment),
            disableMobile: true,
        };
    }


    ngOnInit(): void {
        this.genders.push({ id: 1, text: this.settingGeneralService.getLangText('genders.male') });
        this.genders.push({ id: 2, text: this.settingGeneralService.getLangText('genders.female') });

        this.customerForm = this.builder.group({
            name: ['', [Validators.required, Validators.maxLength(this.validationMaxString.short_string)]],
            surnames: ['', [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            gender: ['', [Validators.required]],
            team_id: ['', [Validators.required]],
            dob: [null, [Validators.required]],
            job: ['', [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            prefix: ['', [Validators.required]],
            mobile: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(this.validationMaxString.long_string)]],
            legal_checkbox: [null],
            legal_name: [null, [Validators.maxLength(this.validationMaxString.short_string)]],
            legal_surnames: [null, [Validators.maxLength(this.validationMaxString.long_string)]],
            legal_identity: [null, [Validators.maxLength(this.validationMaxString.short_string)]],
        });

        this.settingGeneralService.changeCountry$.subscribe(
            (settings) => {
                this.legal_age = settings.legal_age;
            }
        );
    }

    get f() { return this.customerForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.customerForm.invalid) {
            return;
        }

        let customer: CustomerCreated = this.utilService.clear(this.customerForm.value);
        customer.dob = moment(customer.dob[0]).format('YYYY-MM-DD');

        this.subscription.add(this.customerService.saveCustomer(customer).subscribe(
            (response) => {
                this.showSnackBar('Customer created successfully.', 'success');
            },
            (error) => {
                this.showSnackBar('Algo ha pasado ....', 'danger');
            }
        ));
    }

    showSnackBar(text: string, _class: string) {
        this.closeModalF();
        this.snackbarService.show(text, _class);
    }

    changeDob($event) {
        const dob = $event.target.value;
        const dobFormat = moment(dob, this.settingGeneralService.settings.formatMoment);
        const last = moment().subtract(this.legal_age, 'years');

        const legalFields = ['legal_checkbox', 'legal_name', 'legal_surnames', 'legal_identity'];
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

    closeModalF() {
        this.closeModal();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}