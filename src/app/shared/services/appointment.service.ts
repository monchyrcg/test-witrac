import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppointmentCalendar } from '../interfaces/appointment.interface';
import { UtilsService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    date;

    constructor(private http: HttpClient, private utilService: UtilsService) { }

    listAppointment(date?) {
        this.date = date;
        let params = new HttpParams;
        if (date) {
            params = params.append('date', date);
        }
        return this.http
            .get(`${environment.apiUrl}/appointments`, { params })
            .pipe(map((response: any) => {
                return response.data.map((appointmentCalendar: AppointmentCalendar) => {
                    return {
                        title: appointmentCalendar.title,
                        start: new Date(appointmentCalendar.start),
                        allDay: appointmentCalendar.allDay,
                        meta: {
                            appointmentCalendar,
                        },
                    };
                });
            }));
    }

    saveAppointment(appointment) {
        return this.http
            .post(`${environment.apiUrl}/appointments`, appointment)
            .pipe(map((response: any) => {
                response.data;
                this.listAppointment(this.date);
            }));
    }
}