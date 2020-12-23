import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AppointmentsService {

    constructor(private http: HttpClient) { }

    saveCustomerAppointment(data) {
        return this.http.post(`${environment.apiUrl}/external/customer-appointment`, data)
            .pipe(map((response: any) => {
                return response.data;
            }));
    }
}