import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
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
    styleUrls: ['./customer-edit-appointments.component.scss'],
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

    calendar: boolean = false;

    showAppointment: boolean = false;

    appointmentDataForm: FormGroup;
    submitted = false;

    appointments;
    appointment_id: number;

    validationMaxString = Validations.validationMaxString;

    options: OptionI[] = [];

    dateOptions: FlatpickrOptions;

    private subscription = new Subscription();

    constructor(
        private builder: FormBuilder,
        public settingGeneralService: SettingGeneralService,
        private snackbarService: SnackbarService,
        private utilService: UtilsService,
        private appointmentService: AppointmentService,
        private router: Router
    ) {
        this.options.push({ id: 1, text: this.settingGeneralService.getLangText('options.yes') });
        this.options.push({ id: 0, text: this.settingGeneralService.getLangText('options.no') });

        this.showAppointment = false;

        this.dateOptions = {
            locale: this.settingGeneralService.settings.flatpickr,
            disableMobile: true,
            dateFormat: 'Y-m-d H:i',
            enableTime: true
        };
    }

    ngOnInit(): void {
        this.showAppointment = false;
    }

    changeView(showCalendar) {
        this.showAppointment = false;

        this.calendar = showCalendar;
    }

    get f() { return this.appointmentDataForm.controls; }

    showAppointmentO(appointment) {
        console.log(appointment);
        this.showAppointment = false;

        let data = appointment.data;
        this.appointment_id = appointment.id
        if (this.calendar) {
            data = appointment.meta.data;
            this.appointment_id = appointment.meta.id;
        }

        this.showAppointment = true;

        const day = appointment.date + ' ' + appointment.hour;
        this.appointmentDataForm = this.builder.group({
            date: [{ 0: day }, [Validators.required]],
            weight: [null !== data ? data.weight : '', [Validators.required]],
            weight_objective: [null !== data ? data.weight_objective : '', [Validators.required]],
            five_meals: [null !== data ? data.five_meals : '', [Validators.required]],
            water: [null !== data ? data.water : '', [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            digestion: [null !== data ? data.digestion : '', [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            stools: [null !== data ? data.stools : '', [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            notes: [null !== data ? data.notes : '', [Validators.required, Validators.maxLength(this.validationMaxString.text)]],
        });

        const dayMoment = moment(day).format('YYYY-MM-DD HH:mm');
        this.dateOptions.defaultDate = dayMoment;
    }

    onSubmit() {
        this.submitted = true;

        if (this.appointmentDataForm.invalid) {
            return;
        }

        let appointmentDataInformation: AppointmentData = this.utilService.clear(this.appointmentDataForm.value);
        const hour = moment(appointmentDataInformation.date[0]).format('HH:mm');
        appointmentDataInformation.date = moment(appointmentDataInformation.date[0]).format('YYYY-MM-DD');
        appointmentDataInformation.hour = hour;

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

    nutritionalPlan() {
        this.router.navigate([`/customers/${this.customer.id}/${this.appointment_id}/nutritional-plan`]);
    }

    onDelete() {
        this.subscription.add(this.appointmentService.deleteAppointment(this.appointment_id).subscribe(
            (response) => {
                this.submitted = false;
                this.snackbarService.show('Appointment deleted successfully', 'success');
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