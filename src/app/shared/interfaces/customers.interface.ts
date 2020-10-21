export interface CustomerCreated {
    id?: number;
    name: string;
    gender: number;
    team: string;
    email: string;
    dob: any,
    job: string,
    prefix: string,
    mobile: string,
    legal_checkbox?: string,
    legal_name?: string,
    legal_identity?: string,
}

export interface CustomerList {
    id: number;
    name: string;
    email: string;
    team: string,
    appointment: any
}


export interface Customer {
    id: number;
    name: string;
    gender: number;
    team: string;
    email: string;
    dob: any,
    job: string,
    prefix: string,
    mobile: string,
    legal_checkbox?: string,
    legal_name?: string,
    legal_identity?: string,
    next_appointment: any,
}