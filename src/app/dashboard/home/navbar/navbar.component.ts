import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { StaticData } from 'src/app/shared/settings/staticdata';
import { CustomerComponent } from './customer/customer.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

export class NavBarComponent implements OnInit, OnDestroy {

    isOpen = false;
    isOpenMobile = true;
    isLanguage = false;
    openLocaleMobile = false;

    // team
    nameTeam: string;
    divTeams = false;
    totalTeams: number;
    teams: any;

    // locale
    locales = StaticData.locales;
    defaultLocale: string = localStorage.getItem('locale');
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
        this.isLanguage = false;
        this.isOpenMobile = true;
        this.openLocaleMobile = false;
    }

    logout() {
        this.subscription.add(this.loginService.logout().subscribe(() => this.router.navigate(['/login'])));
    }

    changeLang(lang: string): void {
        this.settingService.changeLang(lang);

        this.defaultLocale = lang;
        this.disabled();
    }

    changeTeam(id: number): void {
        this.settingService.changeTeam(id);
        this.divTeams = false;
    }

    showModal() {
        this.modalService.init(ModalComponent, this.settingService.getLangText('modal'), { closeModal: this.closeModal.bind(this) });
    }

    closeModal() {
        this.modalService.destroy();
    }

    createCustomer() {
        this.modalService.init(CustomerComponent, this.settingService.getLangText('client_create'), { closeModal: this.closeModal.bind(this) });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}