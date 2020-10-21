import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from 'src/app/shared/interfaces/customers.interface';
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
    isOpen = false;

    customer$: Observable<Customer>;

    constructor(
        private route: ActivatedRoute,
        private customerService: CustomerService,
        public settingService: SettingsService
    ) { }


    ngOnInit(): void {
        this.customer_id = this.route.snapshot.paramMap.get('hash');

        this.customer$ = this.customerService.getCustomer(this.customer_id);
    }

    ngOnDestroy(): void {
        if (this.customerSubscription) {
            this.customerSubscription.unsubscribe();
        }
    }
}