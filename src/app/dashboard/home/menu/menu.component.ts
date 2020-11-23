import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { ModalInfoComponent } from 'src/app/shared/components/modals/info/modal-info.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import { AppointmentComponent } from './appointment/appointment.component';
import { CustomerComponent } from './customer/customer.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
/* @Injectable({
    providedIn: 'root' // just before your class
}) */
export class MenuComponent {

    isOpenMobile = true;
    showSmallNavBar = false;

    // team
    nameTeam: string;
    divTeams = false;

    totalTeams: number;
    teams: any;

    // @ViewChild("teamDiv") teamDiv: ElementRef;

    constructor(
        public settingGeneralService: SettingGeneralService,
        private modalService: ModalService,
    ) { }

    changeValue(value?) {
        this.isOpenMobile = value ? value : !this.isOpenMobile;
    }

    smallNavBar() {
        this.showSmallNavBar = !this.showSmallNavBar;
    }
    /* changeTeam(id: number) {
        this.teamDiv.nativeElement.style.display = 'none !important';
    
        this.subscription.add(this.settingGeneralService.changeTeam(id).subscribe(() => this.customerService.listCustomer(1, 15)));
        this.divTeams = false;
    } */

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
}