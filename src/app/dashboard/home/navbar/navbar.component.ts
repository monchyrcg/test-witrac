import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { StaticData } from 'src/app/shared/settings/staticdata';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

export class NavBarComponent {

    isOpen = false;
    isOpenMobile = true;
    isLanguage = false;
    locales = StaticData.locales;
    defaultLocale: string = localStorage.getItem('locale');

    constructor(private auth: AuthenticationGeneralService, private translateService: TranslateService, private settingService: SettingsService) { }

    disabled() {
        this.isOpen = false;
        this.isLanguage = false;
    }

    logout() {
        this.auth.logout();
    }

    changeLang(lang: string): void {
        this.settingService.changeLang(lang);

        this.defaultLocale = lang;
        this.disabled();
    }
}