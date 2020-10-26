import { Input } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customers.interface';

@Component({
    selector: 'app-customer-edit-general',
    templateUrl: './customer-edit-general.component.html',
    // styleUrls: ['./customer-edit.component.scss']
})

export class CustomerEditGeneralComponent implements OnInit, OnDestroy {

    @Input() customer;

    ngOnInit(): void {

    }
    ngOnDestroy(): void {

    }

}