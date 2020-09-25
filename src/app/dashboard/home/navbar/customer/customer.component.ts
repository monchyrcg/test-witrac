import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Subscription } from 'rxjs';
import { Gender } from 'src/app/shared/models/gender.model';
import { SettingsService } from 'src/app/shared/services/settings.service';
import * as moment from 'moment';
import Spanish from 'flatpickr/dist/l10n/es.js';


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    // styleUrls: ['./customer.component.scss'],
})

export class CustomerComponent implements OnInit {

    @Input() title: string;
    @Input() text: string;
    @Input() text_button_register: string;
    @Output() closeModal;

    genders: Gender[] = [];
    clientForm: FormGroup;
    submitted = false;

    under: boolean = false;

    private subscription = new Subscription();

    dateOptions: FlatpickrOptions = {
        locale: Spanish.es,
        dateFormat: 'd-m-Y',
        maxDate: moment().format('DD-MM-YYYY'),
        disableMobile: true
    };
    constructor(
        private builder: FormBuilder,
        private settingService: SettingsService
    ) { }


    ngOnInit(): void {
        this.genders.push({ id: 1, text: this.settingService.getLangText('genders.male') });
        this.genders.push({ id: 2, text: this.settingService.getLangText('genders.female') });

        this.clientForm = this.builder.group({
            name: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            team: ['', [Validators.required]],
            dob: ['', [Validators.required]],
            job: ['', [Validators.required]],
            prefix: ['+34', [Validators.required]],
            mobile: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            legal_checkbox: [''],
            legal_name: [''],
            legal_identity: [''],
        });
    }

    get f() { return this.clientForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.clientForm.invalid) {
            return;
        }

    }

    changeDob($event) {
        const dob = $event.target.value;
        const dobFormat = moment(dob, 'DD-MM-YYYY');
        const last = moment().subtract(18, 'years');

        const legalFields = ['legal_checkbox', 'legal_name', 'legal_identity'];
        if (dobFormat.isAfter(last, 'day')) {
            legalFields.forEach(element => {
                this.clientForm.get(element).setValidators([Validators.required]);
            });

            this.under = true;
        } else {
            legalFields.forEach(element => {
                this.clientForm.get(element).clearValidators();
            });

            this.under = false;
        }
        legalFields.forEach(element => {
            this.clientForm.get(element).updateValueAndValidity();
        });
    }

    closeModalF() {
        this.closeModal();
    }
}