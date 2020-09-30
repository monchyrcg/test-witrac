import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) { }

    saveCustomer(customer) {
        return this.http
            .post(`${environment.apiUrl}/customers`, customer)
            .pipe(map((response: any) => {
                response.data;
            }));
    }
}