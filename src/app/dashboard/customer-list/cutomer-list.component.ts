import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit, OnDestroy {

    customers;
    subscriptionCustomers: Subscription;

    constructor(
        private customerService: CustomerService
    ) {
        this.customerService.listCustomer();
    }

    ngOnInit(): void {
        this.subscriptionCustomers = this.customerService.listCustomer$.subscribe(
            (response) => {
                this.customers = response['data'];
                console.log(this.customers);
            }
        );
    }


    ngOnDestroy(): void {
        if (this.subscriptionCustomers) {
            this.subscriptionCustomers.unsubscribe();
        }
    }
}