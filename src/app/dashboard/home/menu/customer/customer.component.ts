import { Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Subscription } from 'rxjs';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import * as moment from 'moment';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { CustomerCreated } from 'src/app/shared/interfaces/customers.interface';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { UtilsService } from 'src/app/shared/services/util.service';
import { Validations } from 'src/app/shared/settings/validation';
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';
import { Illnes } from 'src/app/shared/interfaces/illnes.interface';
import { OptionI } from 'src/app/shared/interfaces/option.interface';


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html'
})

export class CustomerComponent implements OnInit, OnDestroy {

    @Input() title: string;
    @Input() text: string;
    @Input() text_button_register: string;
    @Output() closeModal;

    customerForm: FormGroup;
    submitted = false;

    under: boolean = false;
    legal_age: number;
    validationMaxString = Validations.validationMaxString;

    private subscription = new Subscription();

    dateOptions: FlatpickrOptions;

    options: OptionI[] = [];
    illnesses: Illnes[] = [];

    constructor(
        private builder: FormBuilder,
        public settingGeneralService: SettingGeneralService,
        private customerService: CustomerService,
        private snackbarService: SnackbarService,
        private utilService: UtilsService,
        private authService: AuthenticationGeneralService,
    ) {
        this.options.push({ id: 1, text: this.settingGeneralService.getLangText("options.yes") });
        this.options.push({ id: 0, text: this.settingGeneralService.getLangText('options.no') });

        this.illnesses.push({ id: 1, text: this.settingGeneralService.getLangText('illnesses.diabetes') });
        this.illnesses.push({ id: 2, text: this.settingGeneralService.getLangText('illnesses.heart') });
        this.illnesses.push({ id: 3, text: this.settingGeneralService.getLangText('illnesses.cancer') });

        this.dateOptions = {
            locale: this.settingGeneralService.settings.flatpickr,
            dateFormat: this.settingGeneralService.settings.formatFlatpickr,
            maxDate: moment().format(this.settingGeneralService.settings.formatMoment),
            disableMobile: true,
        };
    }

    renderExternalScript(): HTMLScriptElement {
        // install google maps
        let node = document.createElement('script');
        node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB1ilL7-RLiGsfPuDbTnNXIVSX0g_WbYeI&libraries=places&language=en';
        node.type = 'text/javascript';
        node.async = true;
        document.getElementsByTagName('head')[0].appendChild(node);
        return node;
    }

    ngOnInit(): void {
        this.renderExternalScript().onload = () => {
            this.customerForm = this.builder.group({
                name: ['', [Validators.required, Validators.maxLength(this.validationMaxString.short_string)]],
                surnames: ['', [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
                prefix: ['', [Validators.required]],
                mobile: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email, Validators.maxLength(this.validationMaxString.long_string)]],
                team_id: [this.authService.getUserVariable('current_team_id'), [Validators.required]],
                supplement: ['', [Validators.required]],
                illness: ['', [Validators.required]],
                cp: [null, [Validators.required]],
                dob: [null, []],
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