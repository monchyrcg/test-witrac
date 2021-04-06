import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endOfMonth, subDays } from 'date-fns';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppointmentCalendar } from '../interfaces/appointment.interface';
import { UtilsService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {


    private listAppointmentCustomerSubject = new BehaviorSubject<any>([]);
    public listAppointmentCustomer$ = this.listAppointmentCustomerSubject.asObservable();

    date;

    private deleteSubject = new Subject<any>();
    public deleteState = this.deleteSubject.asObservable();

    private showSubject = new Subject<any>();
    public showState = this.showSubject.asObservable();

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
                        customer_id: appointmentCalendar.customer_id,
                        start: new Date(appointmentCalendar.start),
                        allDay: appointmentCalendar.allDay,
                        color: {
                            'primary': appointmentCalendar.color,
                            'secondary': appointmentCalendar.color

                        },
                        status: appointmentCalendar.status,
                        meta: {
                            appointmentCalendar,
                        },
                        cssClass: 'event-class',
                    };
                });
            }));
    }

    saveAppointment(appointment) {
        return this.http
            .post(`${environment.apiUrl}/appointments`, appointment)
            .pipe(map((response: any) => {
                response.data;
                this.listAppointmentCustomer(appointment.customer_id, response.data.date);
            }));
    }

    listAppointmentCustomer(customer_id, date?) {
        this.date = date;
        let params = new HttpParams;
        params = params.append('customer_id', customer_id);
        if (date) {
            params = params.append('date', date);
        }

        let data = this.http
            .get(`${environment.apiUrl}/appointments`, { params })
            .pipe(map((response: any) => {
                return response.data.map((appointmentCalendar: AppointmentCalendar) => {
                    return {
                        title: appointmentCalendar.title,
                        start: new Date(appointmentCalendar.start),
                        allDay: appointmentCalendar.allDay,
                        color: {
                            primary: appointmentCalendar.color,
                            secondary: appointmentCalendar.color,
                        },
                        meta: {
                            id: appointmentCalendar.id,
                            data: appointmentCalendar.data,
                        },
                    };
                });
            }));

        this.listAppointmentCustomerSubject.next(data);
    }

    updateAppointment(appointment_id, appointment) {
        return this.http
            .post(`${environment.apiUrl}/appointments/${appointment_id}/data`, appointment)
            .pipe(map((response: any) => {
                response.data;
                this.listAppointment(this.date);
            }));
    }

    deleteAppointmentState(appointment_id) {
        this.deleteSubject.next({ appointment_id: appointment_id });
    }

    deleteAppointment(appointment_id) {
        return this.http
            .delete(`${environment.apiUrl}/appointments/${appointment_id}`)
            .pipe(map((response: any) => {
                response.data;
                this.listAppointment(this.date);
            }));
    }

    showAppointmentState(action, appointment) {
        const data = { action: action, appointment: appointment };
        if (action === 1) {
            this.startAppointmentTimestamp(data).subscribe();
        } else {
            this.showSubject.next(data);
        }
    }

    startAppointmentTimestamp(data) {

        return this.http
            .get(`${environment.apiUrl}/appointments/start/${data.appointment.id}`,)
            .pipe(map((response: any) => {
                this.showSubject.next(data);
            }));
    }
}