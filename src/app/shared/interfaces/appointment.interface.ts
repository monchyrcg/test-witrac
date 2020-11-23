export interface Appointment {
    customer_id: number;
    team_id: number;
    user_id: number;
    date: any;
    hour: any;
    kind_appointment_id: number;
}

export interface AppointmentCalendar {
    id: number;
    title: string;
    start: any;
    allDay: boolean;
    color: string;
}