import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',

})

export class HomeComponent {

    isOpen = false;
    isOpenMobile = true;

    constructor(private http: HttpClient) { }


    login() {
        let url = 'http://api.nutriwell.test/sanctum/csrf-cookie';

        this.http.get<any>(url).subscribe((res) => {

            // the response is correct but not set the cookies
            // this.http.post<any>('http://api.nutriwell.test/api/login', { password: 'password', 'email': 'okeefe.quincy@example.org' }).subscribe(success => {
            //     this.http.get<any>('http://api.nutriwell.test/api/users').subscribe(success => console.log(success));
            // }, error => console.log(error))
        })
    }
}