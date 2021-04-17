import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {

    isOpen = false;
    isCountry = false;

    // locale
    private subscription = new Subscription();

    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    ngOnInit(): void {

    }

    logout() {
        this.loginService.logout();
    }

    disabled() {
        this.isOpen = false;
        this.isCountry = false;
    }

    ngOnDestroy(): void {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}