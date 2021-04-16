import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit, OnDestroy {

    isOpen = false;
    isCountry = false;

    // locale
    private subscription = new Subscription();

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        console.log('nit home');
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