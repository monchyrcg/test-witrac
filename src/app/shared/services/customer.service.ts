import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private listCustomersSource = new BehaviorSubject<any>([]);
    public listCustomers$ = this.listCustomersSource.asObservable();

    constructor(private http: HttpClient) { }

    listCustomer(page?, per_page?) {
        if (!page) {
            page = 1;
        }
        if (!per_page) {
            per_page = 15;
        }

        const params = new HttpParams()
            .set('page', page)
            .set('per_page', per_page);

        const data = this.http.get(`${environment.apiUrl}/customers`, { params }).pipe();
        this.listCustomersSource.next(data);
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