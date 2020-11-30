import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { Build } from 'src/app/shared/interfaces/build.interface';
import { CustomerMedicalInformation } from 'src/app/shared/interfaces/customers.interface';
import { Physical } from 'src/app/shared/interfaces/physical.interface';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import { UtilsService } from 'src/app/shared/services/util.service';
import { Validations } from 'src/app/shared/settings/validation';


@Component({
    selector: 'app-customer-edit-medical-history',
    templateUrl: './customer-edit-medical-history.component.html',
    styleUrls: ['../customer-edit.component.scss']
})

export class CustomerEditMedicalHistoryComponent implements OnInit, OnDestroy {

    @Input() customer_id: number;
    @Input() medical;

    builds: Build[] = [];
    physicals: Physical[] = [];

    customerHistoryMedical: FormGroup;
    submitted = false;

    validationMaxString = Validations.validationMaxString;

    private subscription = new Subscription();

    constructor(
        private builder: FormBuilder,
        public settingGeneralService: SettingGeneralService,
        private utilService: UtilsService,
        private snackbarService: SnackbarService,
        private customerService: CustomerService
    ) {
        this.builds.push({ id: 1, text: this.settingGeneralService.getLangText('builds.thin') });
        this.builds.push({ id: 2, text: this.settingGeneralService.getLangText('builds.normal') });
        this.builds.push({ id: 3, text: this.settingGeneralService.getLangText('builds.robust') });

        this.physicals.push({ id: 1, text: this.settingGeneralService.getLangText('physicals.rest') });
        this.physicals.push({ id: 2, text: this.settingGeneralService.getLangText('physicals.v_light') });
        this.physicals.push({ id: 3, text: this.settingGeneralService.getLangText('physicals.light') });
        this.physicals.push({ id: 4, text: this.settingGeneralService.getLangText('physicals.normal') });
        this.physicals.push({ id: 5, text: this.settingGeneralService.getLangText('physicals.intensive') });
        this.physicals.push({ id: 6, text: this.settingGeneralService.getLangText('physicals.v_intensive') });
    }

    ngOnInit(): void {
        if (null === this.medical) {
            this.medical = [];
        }
        this.customerHistoryMedical = this.builder.group({
            history: [this.medical.history ? this.medical.history : '', [Validators.required, Validators.maxLength(this.validationMaxString.text)]],
            drugs: [this.medical.drugs ? this.medical.drugs : '', [Validators.maxLength(this.validationMaxString.text)]],
            allergies: [this.medical.allergies ? this.medical.allergies : '', [Validators.maxLength(this.validationMaxString.text)]],
            weight: [this.medical.weight ? this.medical.weight : '', [Validators.required]],
            height: [this.medical.height ? this.medical.height : '', [Validators.required]],
            weight_objetive: [this.medical.weight_objetive ? this.medical.weight_objetive : '', [Validators.required]],
            build: [this.medical.build ? this.medical.build : '', [Validators.required]],
            physical_activity: [this.medical.physical_activity ? this.medical.physical_activity : '', [Validators.required]],
        });
    }

    get f() { return this.customerHistoryMedical.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.customerHistoryMedical.invalid) {
            console.log('invalid');
            return;
        }

        let customerMedicalInformation: CustomerMedicalInformation = this.utilService.clear(this.customerHistoryMedical.value);


        this.subscription.add(this.customerService.saveMedicalInformation(this.customer_id, customerMedicalInformation).subscribe(
            (response) => {
                this.snackbarService.show('Medical information saved successfully', 'success');
            },
            (error) => {
                this.snackbarService.show('Something was wrong', 'danger');
            }
        ));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}