export interface User {
    created_at: Date;
    email?: string;
    id?: number;
    name?: string;
    updated_at?: Date;
    token: string;
    current_team_id?: number;
    teams?: any;
}