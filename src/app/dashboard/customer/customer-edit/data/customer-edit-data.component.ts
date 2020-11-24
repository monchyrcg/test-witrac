import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';


@Component({
    selector: 'app-customer-edit-data',
    templateUrl: './customer-edit-data.component.html',
    // styleUrls: ['./customer-edit.component.scss']
})

export class CustomerEditDataComponent implements OnInit, OnDestroy {

    customerDataForm: FormGroup;
    submitted = false;

    constructor(
        private builder: FormBuilder,
        public settingGeneralService: SettingGeneralService
    ) { }

    ngOnInit(): void {

    }

    get f() { return this.customerDataForm.controls; }

    ngOnDestroy(): void {

    }

}