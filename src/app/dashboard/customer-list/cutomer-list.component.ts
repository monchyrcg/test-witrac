import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CustomerService } from 'src/app/shared/services/customer.service';

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
    per_page = 15;
    from: number;
    to: number;
    total: number;
    current_page: number;
    first_page: boolean = true;
    last_page: boolean = false;
    links: [];

    constructor(
        private builder: FormBuilder,
        private customerService: CustomerService
    ) { }

    ngOnInit(): void {
        this.listCustomer();

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