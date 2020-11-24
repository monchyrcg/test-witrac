import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';


@Component({
    selector: 'app-customer-edit-data',
    templateUrl: './customer-edit-data.component.html',
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
    styleUrls: ['../customer-edit.component.scss']
})

export class CustomerEditDataComponent implements OnInit, OnDestroy {

    customerDataForm: FormGroup;
    submitted = false;

    showBackground = false;
    showAppointment = [false, false];

    constructor(
        private builder: FormBuilder,
        public settingGeneralService: SettingGeneralService
    ) { }

    ngOnInit(): void {
        console.log(this.showAppointment[0]);
    }

    get f() { return this.customerDataForm.controls; }

    ngOnDestroy(): void {

    }

    showAppointmentF(index) {
        console.log(this.showAppointment[index]);
        this.showAppointment[index] = !this.showAppointment[index];
        console.log(this.showAppointment[index]);
    }

    getAppointmentF(index) {
        return this.showAppointment[index];
    }
}