import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { Build } from 'src/app/shared/interfaces/build.interface';
import { CustomerMedicalInformation } from 'src/app/shared/interfaces/customers.interface';
import { OptionI } from 'src/app/shared/interfaces/option.interface';
import { Physical } from 'src/app/shared/interfaces/physical.interface';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import { UtilsService } from 'src/app/shared/services/util.service';
import { Validations } from 'src/app/shared/settings/validation';


@Component({
    selector: 'app-customer-edit-medical-history',
    templateUrl: './customer-edit-medical-history.component.html'
})

export class CustomerEditMedicalHistoryComponent implements OnInit, OnDestroy {

    @Input() customer_id: number;
    @Input() medical;

    builds: Build[] = [];
    physicals: Physical[] = [];
    options: OptionI[] = [];

    customerHistoryMedical: FormGroup;
    submitted = false;

    validationMaxString = Validations.validationMaxString;

    private subscription = new Subscription();

    private debounce: number = 800;

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

        this.options.push({ id: 1, text: this.settingGeneralService.getLangText('options.yes') });
        this.options.push({ id: 0, text: this.settingGeneralService.getLangText('options.no') });
    }

    ngOnInit(): void {
        if (null === this.medical) {
            this.medical = [];
        }
        this.customerHistoryMedical = this.builder.group({
            build: [this.medical.build ?? '', [Validators.required]],
            physical_activity: [this.medical.physical_activity ?? '', [Validators.required]],
            height: [this.medical.height ? this.medical.height : '', [Validators.required]],
            weight: [this.medical.weight ? this.medical.weight : '', [Validators.required]],
            weight_objective: [this.medical.weight_objective ? this.medical.weight_objective : '', [Validators.required]],
            imc: [{ value: this.medical.imc ? this.medical.imc : null, disabled: true }, [Validators.required]],

            five_meals: [this.medical.five_meals ?? ''],
            water: [this.medical.water ?? '', [Validators.maxLength(this.validationMaxString.long_string)]],
            digestion: [this.medical.digestion ?? '', [Validators.maxLength(this.validationMaxString.long_string)]],
            stools: [this.medical.stools ?? '', [Validators.maxLength(this.validationMaxString.long_string)]],

            history: [this.medical.history ?? '', [Validators.maxLength(this.validationMaxString.text)]],
            drugs: [this.medical.drugs ?? '', [Validators.maxLength(this.validationMaxString.text)]],
            allergies: [this.medical.allergies ?? '', [Validators.maxLength(this.validationMaxString.text)]],

            notes: [this.medical.notes ?? ''],
        });

        this.customerHistoryMedical.valueChanges
            .pipe(debounceTime(this.debounce), distinctUntilChanged())
            .subscribe(query => {
                const weight = query.weight;
                const height = query.height;
                if (this.isValidToQuery(weight) && this.isValidToQuery(height)) {
                    const imc = (10000 * weight) / (height * height);
                    this.customerHistoryMedical.get('imc').setValue(
                        Math.round((imc + Number.EPSILON) * 100) / 100
                    );
                }
            }
            );
    }

    private isValidToQuery(value): boolean {
        if (value != '' || value != null || typeof value !== 'undefined')
            return true;
        return false;
    }

    get f() { return this.customerHistoryMedical.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.customerHistoryMedical.invalid) {
            return;
        }

        let customerMedicalInformation: CustomerMedicalInformation = this.utilService.clear(this.customerHistoryMedical.getRawValue());


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