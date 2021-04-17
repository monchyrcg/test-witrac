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

    listAssets(page, per_page, fields?) {

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
            params = params.append('name', fields['searchText']);
        }

        const data = this.http.get(`${environment.apiUrl}/assets`, { params }).pipe();
        this.assestListSource.next(data);
    }

}