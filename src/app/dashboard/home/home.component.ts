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
        let url = 'http://api.pruebas.test/sanctum/csrf-cookie';

        this.http.get<any>(url).subscribe((res) => {
            console.log(res);

            // the response is correct but not set the cookies
            // this.http.post<any>('http://pruebas.test/api/v1/login', { password: 'password', 'email': 'twatsica@example.com' }).subscribe(success => {
            //   console.log(success);
            //   this.http.get<any>('http://pruebas.test/api/v1/articles').subscribe(success => console.log(success));
            // }
            //   , error => console.log(error))
        })
    }
}