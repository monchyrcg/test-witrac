import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { AppointmentData } from 'src/app/shared/interfaces/appointment.interface';
import { OptionI } from 'src/app/shared/interfaces/option.interface';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import { UtilsService } from 'src/app/shared/services/util.service';
import { Validations } from 'src/app/shared/settings/validation';


@Component({
    selector: 'app-customer-edit-appointments',
    templateUrl: './customer-edit-appointments.component.html',
    styleUrls: ['../customer-edit.component.scss', './customer-edit-appointments.component.scss'],
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
})

export class CustomerEditAppointmentComponent implements OnInit, OnDestroy {

    @Input() customer;
    @Output() reloadCustomer = new EventEmitter<void>();

    calendar: boolean = true;

    showAppointment: boolean = false;

    appointmentDataForm: FormGroup;
    submitted = false;

    appointments;
    appointment_id: number;

    validationMaxString = Validations.validationMaxString;

    options: OptionI[] = [];

    private subscription = new Subscription();

    constructor(
        private builder: FormBuilder,
        public settingGeneralService: SettingGeneralService,
        private snackbarService: SnackbarService,
        private utilService: UtilsService,
        private appointmentService: AppointmentService
    ) {
        this.options.push({ id: 1, text: this.settingGeneralService.getLangText('options.yes') });
        this.options.push({ id: 0, text: this.settingGeneralService.getLangText('options.no') });
    }

    ngOnInit(): void {

    }

    changeView(showCalendar) {
        this.showAppointment = false;
        this.calendar = showCalendar;
    }

    get f() { return this.appointmentDataForm.controls; }

    showAppointmentO(appointment) {
        let data = appointment.data;
        this.appointment_id = appointment.id
        if (this.calendar) {
            data = appointment.meta.data;
            this.appointment_id = appointment.meta.id;
        }

        this.showAppointment = true;

        this.appointmentDataForm = this.builder.group({
            weight: [null !== data ? data.weight : '', [Validators.required]],
            weight_objetive: [null !== data ? data.weight_objetive : '', [Validators.required]],
            five_meals: [null !== data ? data.five_meals : '', [Validators.required]],
            water: [null !== data ? data.water : '', [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            digestion: [null !== data ? data.digestion : '', [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            stools: [null !== data ? data.stools : '', [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            notes: [null !== data ? data.notes : '', [Validators.required, Validators.maxLength(this.validationMaxString.text)]],
        });
    }

    onSubmit() {
        this.submitted = true;

        if (this.appointmentDataForm.invalid) {
            return;
        }

        let appointmentDataInformation: AppointmentData = this.utilService.clear(this.appointmentDataForm.value);


        this.subscription.add(this.appointmentService.updateAppointment(this.appointment_id, appointmentDataInformation).subscribe(
            (response) => {
                this.submitted = false;
                this.snackbarService.show('Appointment updated successfully', 'success');
                this.reloadCustomer.emit();
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