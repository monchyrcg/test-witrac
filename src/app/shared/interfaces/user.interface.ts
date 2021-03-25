import { Time } from "@angular/common";

export interface User {
    created_at: Date;
    email?: string;
    id?: number;
    name?: string;
    updated_at?: Date;
    token: string;
    current_team_id?: number;
    teams?: any;
    start_hour?: Time;
    finish_hour: Time;
    days: any;
    google_calendar_connect: boolean;
    google_calendar_id?: string;
    google_calendar_name?: string;
}