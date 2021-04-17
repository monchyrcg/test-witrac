import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
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

    saveMyLibray(asset) {
        const assets = {
            asset
        }
        return this.http
            .post(`${environment.apiUrl}/assets`, assets)
            .pipe(map((response: any) => {
                return response.data;
            }));
    }
}