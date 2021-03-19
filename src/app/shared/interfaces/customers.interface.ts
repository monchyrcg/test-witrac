export interface CustomerCreated {
    id?: number;
    name: string;
    team: string;
    email: string;
    dob: any;
    supplement: boolean;
    illness: number;
    zip: string;
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

export interface CustomerMedicalInformation {
    history: string;
    drugs: string;
    allergies: string;
    weight: number;
    height: number;
    weight_objetive: number;
    build: number;
    physical_activity: number;
}

export interface CustomerExternal {
    name: string;
    email: string;
    prefix: string,
    mobile: string,
    supplement: boolean;
    illness: number;
    zip: string;
    date: any;
    hour: any;
}