import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { SettingGeneralService } from '../shared/services/settings-general.service';
import { AppointmentsService } from './appointments.service';

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

    customer;
    customerCrypt;
    isOpenMobile = true;
    selected = false;
    is_clicked = true;
    is_signed = false;

    dateOptions: FlatpickrOptions;

    disableDays = ["12-25-2020", "12-31-2020", "01-01-2021"];
    constructor(
        private route: ActivatedRoute,
        private signPrivacyService: AppointmentsService,
        public settingGeneralService: SettingGeneralService
    ) {
        console.log(this.settingGeneralService.settings.formatFlatpickr);
        this.dateOptions = {
            wrap: false,
            inline: true,
            locale: this.settingGeneralService.settings.flatpickr,
            dateFormat: this.settingGeneralService.settings.formatFlatpickr,
            minDate: moment().format(this.settingGeneralService.settings.formatMoment),
            disableMobile: true,
            disable: this.disableDays,
        };
    }


    ngOnInit(): void {
        this.customer = 'a';
    }

    submit() {
        if (!this.selected) {
            this.is_clicked = false;
        } else {
            this.signPrivacyService.saveCustomerCrypt(this.customerCrypt).subscribe(
                (response) => {
                    this.customer = null;
                    this.is_signed = true;
                }
            );
        }
    }
}