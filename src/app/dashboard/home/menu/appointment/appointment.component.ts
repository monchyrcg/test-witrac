import { Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Spanish from 'flatpickr/dist/l10n/es.js';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CustomerList } from 'src/app/shared/interfaces/customers.interface';
import { CustomerService } from 'src/app/shared/services/customer.service';
import * as moment from 'moment';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { TeamService } from 'src/app/shared/services/team.service';
import { Appointment } from 'src/app/shared/interfaces/appointment.interface';
import { UtilsService } from 'src/app/shared/services/util.service';
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { SettingService } from 'src/app/shared/services/setting.service';


@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html'
})

export class AppointmentComponent implements OnInit, OnDestroy {

    @Input() title: string;
    @Input() text_button_create: string;
    @Input() appointmentDay;
    @Input() customerI;
    @Output() closeModal;

    searchText: FormControl;
    customers: CustomerList[];
    customer: CustomerList;
    showCustomers: string = 'none';
    subscription: Subscription = new Subscription;

    appointmentForm: FormGroup;
    submitted = false;
    dateOptions: FlatpickrOptions = {
        locale: Spanish.es,
        dateFormat: 'd-m-Y H:i',
        disableMobile: true,
        enableTime: true
    };
    users: User[];

    current_team_id: number;

    kindsAppointments;
    firstKindAppointment;
    showListKind = false;

    constructor(
        private builder: FormBuilder,
        private customerService: CustomerService,
        public settingGeneralService: SettingGeneralService,
        private teamService: TeamService,
        private utilService: UtilsService,
        private authService: AuthenticationGeneralService,
        private snackbarService: SnackbarService,
        private appointmentService: AppointmentService,
        private settingService: SettingService
    ) { }

    ngOnInit(): void {

        if (this.customerI) {
            this.customer = this.customerI;
        }

        let day = '';
        if (this.appointmentDay) {
            day = moment(this.appointmentDay).format('YYYY-MM-DD HH:mm');
            this.dateOptions.defaultDate = moment(this.appointmentDay).format('DD-MM-YYYY HH:mm');
        }

        this.current_team_id = this.authService.getUserVariable('current_team_id');

        this.searchText = new FormControl('');

        this.searchText.valueChanges
            .pipe(debounceTime(200), distinctUntilChanged())
            .subscribe(query => {
                this.listCustomerFilter(query);
            });

        this.appointmentForm = this.builder.group({
            customer_id: [this.customerI ? this.customerI.id : '', [Validators.required]],
            date: [{ 0: day }, [Validators.required]],
            duration: ['', [Validators.required]],
            team_id: [{ value: this.current_team_id, disabled: true }, [Validators.required]],
            user_id: [{ value: this.authService.getUserVariable('id') }, [Validators.required]],
        });

        this.subscription.add(this.settingGeneralService.changeCountry$.subscribe(
            (settings) => {
                this.dateOptions.locale = settings.flatpickr;
            }
        ));

        this.subscription.add(this.teamService.listUsers(this.current_team_id).subscribe(
            (response) => {
                this.users = response;
                this.appointmentForm.controls['user_id'].setValue('');
                this.subscription.add(this.settingService.getColors(this.current_team_id).subscribe(
                    (response) => {
                        this.kindsAppointments = response;
                        this.firstKindAppointment = this.kindsAppointments[3];
                    }
                ));
            }
        ));
    }

    get f() { return this.appointmentForm.controls; }

    listCustomerFilter(data) {
        if (data.length > 3) {
            this.showCustomers = 'block';
            let query = {
                name: data,
                email: data
            }

            this.subscription.add(this.customerService.listCustomerFilter(query).subscribe(
                (response) => {
                    this.customers = response;
                }
            ));
        } else {
            if (data.length == 0) {
                this.cleanCustomers();
            }
        }
    }

    cleanCustomers() {
        this.searchText.setValue('');
        this.customers = [];
        this.showCustomers = 'none';
    }

    selectCustomer(customer) {
        this.cleanCustomers();
        this.customer = customer;
        this.appointmentForm.controls['customer_id'].setValue(this.customer.id);
    }

    cleanCustomer() {
        this.customer = null;
        this.appointmentForm.reset();
        this.appointmentForm.controls['team_id'].setValue(this.current_team_id);
        this.submitted = false;
    }

    createAppointment() {
        this.submitted = true;

        if (this.appointmentForm.invalid) {
            return;
        }

        let appointment: Appointment = this.utilService.clear(this.appointmentForm.value);

        const hour = moment(appointment.date[0]).format('HH:mm');
        appointment.date = moment(appointment.date[0]).format('YYYY-MM-DD');
        appointment.hour = hour;
        appointment.team_id = this.appointmentForm.controls['team_id'].value;
        appointment.kind_appointment_id = this.firstKindAppointment.kind_appointment_id;
        this.subscription.add(this.appointmentService.saveAppointment(appointment).subscribe(
            (response) => {
                this.showSnackBar('Appointment created successfully.', 'success');
                window.location.reload();
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

    closeModalF() {
        this.closeModal();
    }

    changeKind(kind) {
        this.showListKind = false;
        this.firstKindAppointment = kind;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}