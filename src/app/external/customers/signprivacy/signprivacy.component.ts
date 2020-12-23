import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignPrivacyService } from './signprivacy.service';

@Component({
    selector: 'app-signprivacy',
    templateUrl: './signprivacy.component.html',
    styleUrls: ['./signprivacy.component.scss']
})
export class SignPrivacyComponent implements OnInit {

    customer;
    customerCrypt;
    isOpenMobile = true;
    selected = false;
    is_clicked = true;
    is_signed = false;

    constructor(
        private route: ActivatedRoute,
        private signPrivacyService: SignPrivacyService
    ) { }


    ngOnInit(): void {
        this.customerCrypt = this.route.snapshot.paramMap.get("customer");


        this.signPrivacyService.getCustomerCrypt(this.customerCrypt).subscribe(
            (response) => {
                if (!response.signed) {
                    this.customer = response;
                } else {
                    this.is_signed = true;
                }
            }
        );
    }

    submit() {
        if (!this.selected) {
            this.is_clicked = false;
        } else {
            this.signPrivacyService.saveCustomerCrypt(this.customerCrypt).subscribe(
                (response) => {
                    this.customer = null;
                    this.is_signed = true;
                }
            );
        }
    }
}