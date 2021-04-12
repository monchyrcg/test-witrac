import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { AppointmentData, AppointmentDate, AppointmentFat } from 'src/app/shared/interfaces/appointment.interface';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import { UtilsService } from 'src/app/shared/services/util.service';
import { Validations } from 'src/app/shared/settings/validation';
import { MenuComponent } from 'src/app/dashboard/home/menu/menu.component';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { lastDayOfQuarterWithOptions } from 'date-fns/fp';

const CTE_WATER = 0.732;

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

    dateOptions: FlatpickrOptions;

    private subscription = new Subscription();
    private deleteSubscription: Subscription;
    private showSubscription: Subscription;

    type: number;
    years: number;
    private debounce: number = 800;


    constructor(
        private builder: FormBuilder,
        public settingGeneralService: SettingGeneralService,
        private snackbarService: SnackbarService,
        private utilService: UtilsService,
        private appointmentService: AppointmentService,
        private router: Router,
        private menuComponent: MenuComponent
    ) {
        this.showAppointment = false;

        this.dateOptions = {
            locale: this.settingGeneralService.settings.flatpickr,
            disableMobile: true,
            dateFormat: 'Y-m-d H:i',
            enableTime: true
        };
    }

    ngOnInit(): void {

        this.years = moment().diff(this.customer.dob, 'years');

        this.showAppointment = false;

        this.deleteSubscription = this.appointmentService.deleteState.subscribe(
            (response) => {
                this.deleteAppointment(response.appointment_id);
            }
        );

        this.showSubscription = this.appointmentService.showState.subscribe(
            (response) => {
                const event = {
                    type: response.action == 1 ? 3 : 1,
                    appointment: response.appointment
                };
                this.showAppointmentO(event);
            }
        );
    }

    changeView(showCalendar) {
        this.showAppointment = false;

        this.calendar = showCalendar;
    }

    get f() { return this.appointmentDataForm.controls; }

    showAppointmentO(event) {

        this.showAppointment = false;

        const appointment = event.appointment;
        this.type = event.type;

        let data = appointment?.data;
        this.appointment_id = appointment.id
        if (this.calendar) {
            data = appointment.meta.data;
            this.appointment_id = appointment.meta.id;
        }
        let fat = appointment?.fat;

        this.showAppointment = true;

        const day = appointment.date + ' ' + appointment.hour;

        this.appointmentDataForm = this.builder.group({
            date: [{ 0: day }, [Validators.required]],
        });

        if (this.type !== 2) {
            this.appointmentDataForm = this.builder.group({
                ...this.appointmentDataForm.controls,
                imc: [{ value: null !== data ? data.imc : '', disabled: true }, [Validators.required]],
                weight: [null !== data ? data.weight : '', [Validators.required]],
                weight_objective: [null !== data ? data.weight_objective : '', [Validators.required]],
                weight_theoretical: [{ value: this.customer.medical.weight_theoretical, disabled: true }],
                notes: [null !== data ? data.notes : '', [Validators.maxLength(this.validationMaxString.text)]],
                waist: [null !== data ? data.waist : ''],
                girth: [null !== data ? data.girth : ''],
                hip: [null !== data ? data.hip : ''],
                leg: [null !== data ? data.leg : ''],
                fat_percentage: [null !== fat ? fat.fat_percentage : null],
                fat: [{ value: null !== fat ? fat.fat : '', disabled: true }],
                body_fat: [{ value: null !== fat ? fat.body_fat : '', disabled: true }],
                excess_fat: [{ value: null !== fat ? fat.excess_fat : '', disabled: true }],
                not_fat: [{ value: null !== fat ? fat.not_fat : '', disabled: true }],
                water: [{ value: null !== fat ? fat.water : '', disabled: true }],
                excess_water: [{ value: null !== fat ? fat.excess_water : '', disabled: true }],
            });


            this.appointmentDataForm.get("weight").valueChanges
                .pipe(debounceTime(this.debounce), distinctUntilChanged())
                .subscribe(weight => {
                    if (typeof weight !== 'undefined') {
                        const number = (10000 * weight) / (this.customer.medical.height * this.customer.medical.height);
                        this.appointmentDataForm.get('imc').setValue(
                            Math.round((number + Number.EPSILON) * 100) / 100
                        );

                        const fat_percentage = this.appointmentDataForm.controls['fat_percentage'].value;
                        if (fat_percentage !== null) {
                            this.calculateFatNumbers(fat_percentage);
                        }
                    }
                }
                );

            this.appointmentDataForm.get('fat_percentage').valueChanges
                .pipe(debounceTime(this.debounce), distinctUntilChanged())
                .subscribe(percentage => {
                    this.calculateFatNumbers(percentage);
                }
                );
        }

        const dayMoment = moment(day).format('YYYY-MM-DD HH:mm');
        this.dateOptions.defaultDate = dayMoment;
    }

    private calculateFatNumbers(percentaje: number) {
        const weight = this.appointmentDataForm.get('weight').value;
        const fat = (weight * percentaje) / 100;
        const body_fat = (weight * (Math.round((this.getOptimalFactor() + Number.EPSILON) * 100) / 100)) / 100;
        const excess_fat = Math.round(((fat - body_fat) + Number.EPSILON) * 100) / 100;
        const not_fat = weight - fat;
        const water = not_fat * CTE_WATER;
        const excess_water = Math.round(((weight - (parseFloat(this.appointmentDataForm.get('weight_theoretical').value) + excess_fat)) + Number.EPSILON) * 100) / 100;

        this.appointmentDataForm.get('fat').setValue(fat);
        this.appointmentDataForm.get('body_fat').setValue(body_fat);
        this.appointmentDataForm.get('excess_fat').setValue(excess_fat);
        this.appointmentDataForm.get('not_fat').setValue(not_fat);
        this.appointmentDataForm.get('water').setValue(water);
        this.appointmentDataForm.get('excess_water').setValue(excess_water);
    }

    private getOptimalFactor(): number {
        switch (this.customer.gender) {
            case 2:
                if (this.years >= 30)
                    return 17;
                else
                    return 14;
                break;

            default:
                if (this.years >= 30)
                    return 27;
                else
                    return 24;
                break;
        }
    }

    onSubmit() {
        this.submitted = true;

        if (this.appointmentDataForm.invalid) {
            return;
        }

        let appointmentDataInformation: AppointmentDate | AppointmentData = this.utilService.clear(this.appointmentDataForm.getRawValue());

        const hour = moment(appointmentDataInformation.date[0]).format('HH:mm');
        appointmentDataInformation.date = moment(appointmentDataInformation.date[0]).format('YYYY-MM-DD');
        appointmentDataInformation.hour = hour;

        this.subscription.add(this.appointmentService.updateAppointment(this.appointment_id, appointmentDataInformation).subscribe(
            (response) => {
                this.submitted = false;
                if (this.type !== 2 && null !== this.appointmentDataForm.controls['fat_percentage'].value) {
                    this.saveFatData();
                } else {
                    this.showSnackService('Appointment updated successfully', 'success');
                }
            },
            (error) => {
                this.showSnackService('Something was wrong', 'danger');
            }
        ));
    }

    private showSnackService(text: string, cssClass: string) {
        this.snackbarService.show(text, cssClass);
        if ('success' === cssClass)
            this.reloadCustomer.emit();
    }

    private saveFatData() {
        let appointmentFatInformation: AppointmentFat = this.utilService.clear(this.appointmentDataForm.getRawValue());

        this.subscription.add(this.appointmentService.updateFatAppointment(this.appointment_id, appointmentFatInformation).subscribe(
            (response) => {
                this.showSnackService('Appointment updated successfully', 'success');
            },
            (error) => {
                this.showSnackService('Something was wrong', 'danger');
            }
        ));
    }

    nutritionalPlan() {
        this.router.navigate([`/customers/${this.customer.id}/${this.appointment_id}/nutritional-plan`]);
    }

    generateStartModal(event) {
        this.menuComponent.generateStartAppointment(event);
    }

    generateDeleteModal(event) {
        this.menuComponent.generateDeleteAppointment(event);
    }

    deleteAppointment(appointment_id) {
        this.subscription.add(this.appointmentService.deleteAppointment(appointment_id).subscribe(
            (response) => {
                this.submitted = false;
                this.showSnackService('Appointment deleted successfully', 'success');
            },
            (error) => {
                this.showSnackService('Something was wrong', 'danger');
            }
        ));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();

        if (this.deleteSubscription) {
            this.deleteSubscription.unsubscribe();
        }

        if (this.showSubscription) {
            this.showSubscription.unsubscribe();
        }
    }
}
