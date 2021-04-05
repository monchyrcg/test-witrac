export interface Appointment {
    customer_id: number;
    duration: number;
    team_id: number;
    user_id: number;
    date: any;
    hour: any;
    kind_appointment_id: number;
}

export interface AppointmentCalendar {
    id: number;
    customer_id: number;
    title: string;
    start: any;
    allDay: boolean;
    color: string;
    data: any;
}

export interface AppointmentData {
    weight: number;
    weight_objective: number;
    five_meals: boolean;
    water: string;
    digestion: string;
    stools: string;
    notes: string;
    date: any;
    hour: any;
}

export interface AppointmentDate {
    date: any;
    hour: any;
}