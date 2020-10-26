import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilsService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class MagentoService {

    private listProductsSource = new BehaviorSubject<any>([]);
    public listProducts$ = this.listProductsSource.asObservable();

    constructor(
        private http: HttpClient,
        private utilService: UtilsService
    ) { }

    listProducts(page, per_page, fields) {
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

        const data = this.http.get(`${environment.apiUrl}/magento`, { params }).pipe();
        this.listProductsSource.next(data);
    }
}