import { Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Subscription } from 'rxjs';
import { Gender } from 'src/app/shared/interfaces/gender.interface';
import { SettingsService } from 'src/app/shared/services/settings.service';
import * as moment from 'moment';
import Spanish from 'flatpickr/dist/l10n/es.js';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer, CustomerCreated } from 'src/app/shared/interfaces/customers.interface';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { UtilsService } from 'src/app/shared/services/util.service';


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    // styleUrls: ['./customer.component.scss'],
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
        public settingService: SettingsService,
        private customerService: CustomerService,
        private snackbarService: SnackbarService,
        private utilService: UtilsService
    ) {
        this.dateOptions = {
            locale: this.settingService.settings.flatpickr,
            dateFormat: this.settingService.settings.formatFlatpickr,
            maxDate: moment().format(this.settingService.settings.formatMoment),
            disableMobile: true,
        };
    }


    ngOnInit(): void {
        this.genders.push({ id: 1, text: this.settingService.getLangText('genders.male') });
        this.genders.push({ id: 2, text: this.settingService.getLangText('genders.female') });

        this.customerForm = this.builder.group({
            name: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            team_id: ['', [Validators.required]],
            dob: [null, [Validators.required]],
            job: ['', [Validators.required]],
            prefix: ['', [Validators.required]],
            mobile: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            legal_checkbox: [null],
            legal_name: [null],
            legal_identity: [null],
        });

        this.settingService.changeCountry$.subscribe(
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
        const dobFormat = moment(dob, this.settingService.settings.formatFlatpickr);
        const last = moment().subtract(this.legal_age, 'years');

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

    closeModalF() {
        this.closeModal();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}