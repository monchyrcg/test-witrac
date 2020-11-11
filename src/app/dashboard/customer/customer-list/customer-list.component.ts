import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { TwilioService } from 'src/app/shared/services/twilio.service';
import * as Twilio from 'twilio-client';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit, OnDestroy {

    customers;
    listCustomerSubscription: Subscription = null;

    name: string;
    customerForm: FormGroup;
    private debounce: number = 200;

    // pagination
    page = 1;
    per_page = 5;
    from: number;
    to: number;
    total: number;
    current_page: number;
    first_page: boolean = true;
    last_page: boolean = false;
    links: [];

    device = new Twilio.Device();

    loadingShow: boolean = false;
    listCustomer$ = Observable;

    constructor(
        private builder: FormBuilder,
        private customerService: CustomerService,
        public settingService: SettingsService,
        private twilioService: TwilioService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.listCustomer();

        this.twilioService.getToken().subscribe(
            (response) => {
                this.device.setup(response);
            }
        );

        this.listCustomerSubscription = this.customerService.listCustomers$.subscribe(
            (response) => {
                response.subscribe(
                    (data) => {
                        this.loadingShow = true;

                        this.customers = data['data'];

                        // pagination
                        const meta = data['meta'];

                        this.from = meta.from;
                        this.to = meta.to;
                        this.total = meta.total;
                        this.current_page = meta.current_page;
                        this.first_page = meta.current_page == 1 ? true : false;
                        this.last_page = meta.last_page === meta.current_page ? true : false;
                        this.links = meta.links;

                        this.loadingShow = false;
                    }
                )
                this.listCustomer$ = response;
            }
        );

        this.customerForm = this.builder.group({
            name: [''],
            email: [''],
        });

        this.customerForm.valueChanges
            .pipe(debounceTime(this.debounce), distinctUntilChanged())
            .subscribe(query => {
                this.page = 1;
                this.listCustomer(query);
            });
    }

    listCustomer(query?) {
        this.customerService.listCustomer(this.page, this.per_page, query);
    }

    call(customer) {
        this.device.connect({ phoneNumber: customer.phone });
    }

    edit(id: number) {
        this.router.navigate(['/customers/' + id]);
    }

    nextPage(page) {
        if (page == '+')
            page = ++this.page;

        if (page == '-')
            page = --this.page;

        this.page = page;

        this.listCustomer();
    }

    showPerPage(number): boolean {
        if (number >= this.page && number != 0 && number != (this.links.length - 1) && number < (this.page + 2))
            return true;
        return false;
    }

    ngOnDestroy(): void {
        if (this.listCustomerSubscription) {
            this.listCustomerSubscription.unsubscribe();
        }
    }
}