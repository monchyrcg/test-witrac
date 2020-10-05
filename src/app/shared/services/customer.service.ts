import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private listCustomerSource = new Subject<any>();
    public listCustomer$ = this.listCustomerSource.asObservable();

    constructor(private http: HttpClient) { }

    listCustomer() {
        this.listCustomer$ = this.http.get(`${environment.apiUrl}/customers`);
        console.log(this.listCustomer$);
        this.listCustomerSource.next();
    }

    saveCustomer(customer) {
        return this.http
            .post(`${environment.apiUrl}/customers`, customer)
            .pipe(map((response: any) => {
                response.data;
                this.listCustomer();
            }));
    }
}