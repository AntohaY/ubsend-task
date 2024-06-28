export enum UserRole {
    CUSTOMER = 'customer',
    QA = 'qa',
    WAREHOUSE = 'warehouse',
    STOREKEEPER = 'storekeeper'
}

export interface User {
    id: string;
    name: string;
    displayName: string;
    addressLine: string;
    postalCode: string;
    city: string;
    countryCode: string;
    phoneNumber: string;
    mail: string;
    password: string;
    role: UserRole;
}