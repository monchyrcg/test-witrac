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
            console.log(fields);
            console.log(typeof fields);
            for (const varName in fields) {
                if (!(fields[varName] == null || fields[varName].toString().trim() === '')) {
                    params = params.append(varName, fields[varName]);
                }
            }
        }

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