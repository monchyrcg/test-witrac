import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class LibraryService {

    private libraryListSource = new BehaviorSubject<any>([]);
    public libraryList$ = this.libraryListSource.asObservable();

    constructor(
        private http: HttpClient
    ) { }

    listLibraries(page, per_page) {
        if (!page) {
            page = 1;
        }
        if (!per_page) {
            per_page = 15;
        }

        let params = new HttpParams();
        params = params.append('page', page);
        params = params.append('per_page', per_page);

        const data = this.http.get(`${environment.apiUrl}/libraries`, { params }).pipe();
        this.libraryListSource.next(data);
    }
}