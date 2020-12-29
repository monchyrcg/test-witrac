import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CustomerEditNutritionalPlanService {

    constructor(private http: HttpClient) { }

    getNutritionalPlanData() {
        return this.http.get(`${environment.apiUrl}/nutritional-plan`)
            .pipe(map((response: any) => {

                return response.data;
            }));
    }

    getNutritionalPlan(customer_id, appointment_id) {
        return this.http.get(`${environment.apiUrl}/nutritional-plan/${customer_id}/${appointment_id}`)
            .pipe(map((response: any) => {
                return response.data;
            }));
    }

    saveNutritionalPlan(customer_id, appointment_id, body) {
        return this.http.post(`${environment.apiUrl}/nutritional-plan/${customer_id}/${appointment_id}`, body)
            .pipe(map((response: any) => {
                return response.data;
            }));
    }
}