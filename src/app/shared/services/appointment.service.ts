import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilsService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    constructor(private http: HttpClient, private utilService: UtilsService) { }


    saveAppointment(appointment) {
        return this.http
            .post(`${environment.apiUrl}/appointments`, appointment)
            .pipe(map((response: any) => {
                response.data;
            }));
    }
}