import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CustomerEditNutritionalPlanService {

    constructor(private http: HttpClient) { }

    getNutritionalPlan() {
        return this.http.get(`${environment.apiUrl}/nutritional-plan`,)
            .pipe(map((response: any) => {
                return response.data;
            }));
    }
}