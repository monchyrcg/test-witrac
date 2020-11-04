import { Component } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { AppointmentComponent } from './appointment/appointment.component';
import { CustomerComponent } from './customer/customer.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})

export class MenuComponent {

    isOpenMobile = true;

    // team
    nameTeam: string;
    divTeams = false;

    totalTeams: number;
    teams: any;

    // @ViewChild("teamDiv") teamDiv: ElementRef;

    constructor(
        public settingService: SettingsService,
        private modalService: ModalService,
    ) { }

    changeValue(value?) {
        this.isOpenMobile = value ? value : !this.isOpenMobile;
    }

    /* changeTeam(id: number) {
        this.teamDiv.nativeElement.style.display = 'none !important';
    
        this.subscription.add(this.settingService.changeTeam(id).subscribe(() => this.customerService.listCustomer(1, 15)));
        this.divTeams = false;
    } */

    showModal() {
        this.changeValue(true);
        this.modalService.init(ModalComponent, this.settingService.getLangText('modal'), { closeModal: this.closeModal.bind(this) });
    }

    closeModal() {
        this.modalService.destroy();
    }

    createCustomer() {
        this.changeValue(true);
        this.modalService.init(CustomerComponent, this.settingService.getLangText('customer_create'), { closeModal: this.closeModal.bind(this) });
    }

    createAppointment() {
        this.changeValue(true);
        this.modalService.init(AppointmentComponent, this.settingService.getLangText('appointment_create'), { closeModal: this.closeModal.bind(this) })
    }
}