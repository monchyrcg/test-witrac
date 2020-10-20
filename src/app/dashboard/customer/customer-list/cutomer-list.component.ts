import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CustomerList } from 'src/app/shared/models/customers.model';
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

    customers: CustomerList;
    listCustomerSubscription: Subscription = null;

    name: string;
    customerForm: FormGroup;
    private debounce: number = 200;

    // pagination
    page = 1;
    per_page = 15;
    from: number;
    to: number;
    total: number;
    current_page: number;
    first_page: boolean = true;
    last_page: boolean = false;
    links: [];

    device = new Twilio.Device();

    constructor(
        private builder: FormBuilder,
        private customerService: CustomerService,
        public settingService: SettingsService,
        private twilioService: TwilioService
    ) { }

    ngOnInit(): void {
        this.listCustomer();

        this.twilioService.getToken().subscribe(
            (response) => {
                this.device.setup(response);

                console.log(this.device.status());
            }
        );

        this.listCustomerSubscription = this.customerService.listCustomers$.subscribe(
            (response) => {
                response.subscribe(
                    (data) => {
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
                    }
                )
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

    call() {
        console.log(this.device.status());
        this.device.connect({ phoneNumber: '+34680508794' });
    }

    listCustomer(query?) {
        this.customerService.listCustomer(this.page, this.per_page, query);
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