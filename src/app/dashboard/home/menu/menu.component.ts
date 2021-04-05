import { Component } from '@angular/core';
import { ModalInfoComponent } from 'src/app/shared/components/modals/info/modal-info.component';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import { CustomerEditNutritionalPlanService } from '../../customer/customer-edit/nutritional-plan/customer-edit-nutritional-plan.service';
import { AppointmentComponent } from './appointment/appointment.component';
import { CustomerEditCrashDietComponent } from './crashDiet/customer-edit-crash-diet.component';
import { CustomerComponent } from './customer/customer.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})

export class MenuComponent {

    isOpenMobile = true;
    showSmallNavBar = false;

    // team
    nameTeam: string;
    divTeams = false;

    totalTeams: number;
    teams: any;

    crashDays: [];



    constructor(
        public settingGeneralService: SettingGeneralService,
        private modalService: ModalService,
        private nutritionalPlanService: CustomerEditNutritionalPlanService,
        private appointmentService: AppointmentService
    ) { }

    changeValue(value?) {
        this.isOpenMobile = value ? value : !this.isOpenMobile;
    }

    smallNavBar() {
        this.showSmallNavBar = !this.showSmallNavBar;
    }


    showModal() {
        this.changeValue(true);
        this.modalService.init(ModalInfoComponent, this.settingGeneralService.getLangText('modal'), { closeModal: this.closeModal.bind(this) });
    }

    closeModal() {
        this.modalService.destroy();
    }

    createCustomer() {
        this.changeValue(true);
        this.modalService.init(CustomerComponent, this.settingGeneralService.getLangText('customer_create'), { closeModal: this.closeModal.bind(this) });
    }

    createAppointment(date?, customer?) {
        this.changeValue(true);
        let inputs = this.settingGeneralService.getLangText('appointment_create');
        if (date) {
            inputs.appointmentDay = date;
        }
        if (customer) {
            inputs.customerI = customer;
        }

        this.modalService.init(AppointmentComponent, inputs, { closeModal: this.closeModal.bind(this) })
    }

    // crashDays
    createCrashDay() {
        this.changeValue(true);
        this.modalService.init(
            CustomerEditCrashDietComponent,
            this.settingGeneralService.getLangText('customer_edit.nutritional_plan.shock'),
            { closeModal: this.closeModal.bind(this), sendDays: ($days) => { this.sendDays($days) } }
        );
    }

    sendDays(days) {
        this.closeModal();

        this.nutritionalPlanService.changeCrashState(days);
    }

    // deleteAppointment
    generateDeleteAppointment(appointment_id) {
        this.changeValue(true);

        this.modalService.init(
            ModalInfoComponent,
            this.settingGeneralService.getLangText('customer_edit.appointments'),
            { closeModal: this.closeModal.bind(this), buttonAction: ($action) => { this.deleteAppointment(appointment_id) } });
    }

    deleteAppointment(appointment_id) {
        this.closeModal();
        this.appointmentService.deleteAppointmentState(appointment_id)
    }
}