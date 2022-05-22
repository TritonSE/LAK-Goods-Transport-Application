export interface JobData {
    _id: string,
    title: string;
    clientName: string;
    phoneNumber?: string;
    deliveryDate: string;
    pickupLocation: string;
    dropoffLocation: string;
    packageQuantity?: number;
    applicants?: number;
    status: 'CREATED' | 'ASSIGNED' | 'COMPLETED' ;
    imageIds: string[];
}

export interface ApplicantData {
    firstName: string;
    lastName: string;
    phone: string;
    vehicleInformation: string;
}