import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { StaticData } from 'src/app/shared/settings/staticdata';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

export class NavBarComponent implements OnDestroy {

    isOpen = false;
    isOpenMobile = true;
    isLanguage = false;
    openLocaleMobile = false;
    locales = StaticData.locales;
    defaultLocale: string = localStorage.getItem('locale');

    private subscription = new Subscription();

    constructor(
        private settingService: SettingsService,
        private loginService: LoginService,
        private router: Router,
        private modalService: ModalService
    ) { }


    disabled() {
        this.isOpen = false;
        this.isLanguage = false;
        this.isOpenMobile = true;
        this.openLocaleMobile = false;
    }

    logout() {
        this.subscription.add(this.loginService.logout().subscribe(
            (response) => {
                this.router.navigate(['/login']);
            }
        ));
    }

    changeLang(lang: string): void {
        this.settingService.changeLang(lang);

        this.defaultLocale = lang;
        this.disabled();
    }

    showModal() {
        this.modalService.init(ModalComponent, { text: 'El texto nuevo' }, { closeModal: this.closeModal.bind(this) });
    }

    closeModal() {
        console.log(this.modalService); // undefined
        this.modalService.destroy();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}