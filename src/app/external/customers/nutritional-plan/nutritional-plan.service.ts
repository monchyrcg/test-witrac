import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NutritionalPlanService {

    constructor(private http: HttpClient) { }

    getNutritionalPlan(is_desktop) {
        let params = new HttpParams;
        params = params.append('desktop', is_desktop);

        return this.http.get(`${environment.apiUrl}/external/customer-nutritional-plan`, { params })
            .pipe(map((response: any) => {
                return response.data;
            }));
    }

}