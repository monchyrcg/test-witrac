import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import { Countries } from 'src/app/shared/settings/country';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {

    isOpen = false;
    isCountry = false;

    // locale
    countries = Countries.countries;
    defaultCountry: string = localStorage.getItem('country');
    private subscription = new Subscription();

    constructor(
        public settingGeneralService: SettingGeneralService,
        private loginService: LoginService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.settingGeneralService.getTeam();
    }

    disabled() {
        this.isOpen = false;
        this.isCountry = false;
    }

    logout() {
        this.subscription.add(this.loginService.logout().subscribe(() => this.router.navigate(['/login'])));
    }

    changeCountry(country: string): void {
        this.settingGeneralService.changeCountry(country);

        this.defaultCountry = country;
        this.disabled();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}