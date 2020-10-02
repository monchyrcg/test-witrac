import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { Countries } from 'src/app/shared/settings/country';
import { CustomerComponent } from './customer/customer.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

export class NavBarComponent implements OnInit, OnDestroy {

    isOpen = false;
    isOpenMobile = true;
    isCountry = false;
    openCountryMobile = false;

    // team
    nameTeam: string;
    divTeams = false;
    totalTeams: number;
    teams: any;

    // locale
    countries = Countries.countries;
    defaultCountry: string = localStorage.getItem('country');
    private subscription = new Subscription();

    constructor(
        public settingService: SettingsService,
        private loginService: LoginService,
        private router: Router,
        private modalService: ModalService
    ) { }


    ngOnInit(): void {
        this.settingService.getTeam();
    }


    disabled() {
        this.isOpen = false;
        this.isCountry = false;
        this.isOpenMobile = true;
        this.openCountryMobile = false;
    }

    logout() {
        this.subscription.add(this.loginService.logout().subscribe(() => this.router.navigate(['/login'])));
    }

    changeCountry(country: string): void {
        this.settingService.changeCountry(country);

        this.defaultCountry = country;
        this.disabled();
    }

    changeTeam(id: number) {
        this.subscription.add(this.settingService.changeTeam(id).subscribe());
        this.divTeams = false;
    }

    showModal() {
        this.modalService.init(ModalComponent, this.settingService.getLangText('modal'), { closeModal: this.closeModal.bind(this) });
    }

    closeModal() {
        this.modalService.destroy();
    }

    createCustomer() {
        this.modalService.init(CustomerComponent, this.settingService.getLangText('customer_create'), { closeModal: this.closeModal.bind(this) });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}