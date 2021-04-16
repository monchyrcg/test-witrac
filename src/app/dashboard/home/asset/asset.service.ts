import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";



@Injectable({
    providedIn: 'root'
})
export class AssetService {

    private assestListSource = new BehaviorSubject<any>([]);
    public assetsList$ = this.assestListSource.asObservable();

    constructor(
        private http: HttpClient
    ) { }

    listAssets(fields?) {

        let params = new HttpParams();
        if (fields) {
            params = params.append('name', fields['searchText']);
        }

        const data = this.http.get(`${environment.apiUrl}/customers`, { params }).pipe();
        this.assestListSource.next(data);
    }

}