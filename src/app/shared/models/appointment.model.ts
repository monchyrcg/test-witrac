export interface Appointment {
    customer_id: number;
    team_id: number;
    user_id: number;
    date: any;
    hour: any;
}

export interface AppointmentCalendar {
    id: number;
    title: string;
    start: any;
    allDay: boolean;
}