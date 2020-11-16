import { HttpClient, HttpParams } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilsService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private listCustomersSource = new BehaviorSubject<any>([]);
    public listCustomers$ = this.listCustomersSource.asObservable();

    constructor(private http: HttpClient, private utilService: UtilsService) { }

    listCustomer(page?, per_page?, fields?) {
        if (!page) {
            page = 1;
        }
        if (!per_page) {
            per_page = 15;
        }

        let params = new HttpParams();
        params = params.append('page', page);
        params = params.append('per_page', per_page);

        if (fields) {
            params = this.utilService.addToParam(params, fields);
        }

        const data = this.http.get(`${environment.apiUrl}/customers`, { params }).pipe();
        this.listCustomersSource.next(data);
    }

    listCustomerFilter(fields) {
        let params = new HttpParams;
        if (fields) {
            params = this.utilService.addToParam(params, fields);
        }


        return this.http.get(`${environment.apiUrl}/customers/filter`, { params })
            .pipe(map((response: any) => {
                return response.data;
            }));
    }

    saveCustomer(customer) {
        return this.http
            .post(`${environment.apiUrl}/customers`, customer)
            .pipe(map((response: any) => {
                response.data;
                this.listCustomer();
            }));
    }

    getCustomer(customer_id: string) {
        return this.http.get(`${environment.apiUrl}/customers/${customer_id}`,)
            .pipe(map((response: any) => {
                return response.data;
            }));
    }

    getCustomerCrypt(customer: string) {
        return this.http.get(`${environment.apiUrl}/sign-privacy/${customer}`,)
            .pipe(map((response: any) => {
                return response.data;
            }));
    }
}