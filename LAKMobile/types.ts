export interface JobData {
    title: string;
    clientName: string;
    phoneNumber?: string;
    deliveryDate: string;
    pickupLocation: string;
    dropoffLocation: string;
    packageQuantity?: number;
    applicants?: number;
    status: 'CREATED' | 'ASSIGNED' | 'COMPLETED' ;
}