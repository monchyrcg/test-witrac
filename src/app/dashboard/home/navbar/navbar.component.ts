import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

export class NavBarComponent {

    isOpen = false;
    isOpenMobile = true;

    constructor(private auth: AuthenticationGeneralService, private translateService: TranslateService ) { }


    logout() {
        this.auth.logout();
    }

    changeLang(lang: string): void {
        localStorage.setItem('locale', lang);
        this.translateService.use(lang);
    }
}