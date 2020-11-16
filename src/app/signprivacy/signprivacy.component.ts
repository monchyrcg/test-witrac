import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../shared/services/customer.service';

@Component({
    selector: 'app-signprivacy',
    templateUrl: 'signprivacy.component.html'
})
export class SignPrivayComponent implements OnInit {

    customer;
    constructor(
        private route: ActivatedRoute,
        private customerService: CustomerService
    ) { }


    ngOnInit(): void {
        let customer = this.route.snapshot.paramMap.get("customer");


        this.customerService.getCustomerCrypt(customer).subscribe(
            (response) => {
                this.customer = response;
            }
        );
    }
}