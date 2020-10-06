import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit, OnDestroy {

    customers;
    listCustomerSubscription: Subscription = null;

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
        private customerService: CustomerService
    ) { }

    ngOnInit(): void {
        this.customerService.listCustomer(this.page, this.per_page);

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
        )
    }

    nextPage(page) {
        if (page == '+')
            page = ++this.page;

        if (page == '-')
            page = --this.page;

        this.page = page;

        this.customerService.listCustomer(page, this.per_page);
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