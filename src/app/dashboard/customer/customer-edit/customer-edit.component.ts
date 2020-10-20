import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/shared/models/customers.model';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { SettingsService } from 'src/app/shared/services/settings.service';



@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    // styleUrls: ['./customer-edit.component.scss']
})

export class CustomerEditComponent implements OnInit, OnDestroy {

    customer_id: string;
    customer: Customer = null;
    customerSubscription: Subscription = null;

    constructor(
        private route: ActivatedRoute,
        private customerService: CustomerService,
        public settingService: SettingsService
    ) { }


    ngOnInit(): void {
        this.customer_id = this.route.snapshot.paramMap.get('hash');

        this.customerSubscription = this.customerService.getCustomer(this.customer_id).subscribe(
            (response) => {
                this.customer = response;
            }
        );
    }
    ngOnDestroy(): void {
        if (this.customerSubscription) {
            this.customerSubscription.unsubscribe();
        }
    }
}